import { useState, useEffect } from 'react';
import './App.css';
import UserProfile from './components/UserProfile';
import StatsCards from './components/StatsCards';
import LanguageChart from './components/LanguageChart';
import TopRepos from './components/TopRepos';
import OpenIssues from './components/OpenIssues';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Busca dados do usuário
      const userRes = await fetch(`${API_URL}/user`);
      if (!userRes.ok) throw new Error('Erro ao buscar dados do usuário');
      const userData = await userRes.json();
      setUser(userData);

      // Busca estatísticas
      const statsRes = await fetch(`${API_URL}/stats`);
      if (!statsRes.ok) throw new Error('Erro ao buscar estatísticas');
      const statsData = await statsRes. json();
      setStats(statsData);

      // Busca issues abertas
      const issuesRes = await fetch(`${API_URL}/issues`);
      if (!issuesRes.ok) throw new Error('Erro ao buscar issues');
      const issuesData = await issuesRes.json();
      setIssues(issuesData);

    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Carregando seu dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>❌ Erro ao carregar dados</h2>
        <p>{error}</p>
        <button onClick={fetchData} className="retry-btn">
          🔄 Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      <header>
        <h1>🚀 GitHub Dashboard</h1>
        <button onClick={fetchData} className="refresh-btn">
          🔄 Atualizar
        </button>
      </header>

      <main className="dashboard">
        <UserProfile user={user} />
        <StatsCards stats={stats} />
        <div className="grid-2">
          <LanguageChart languages={stats?.languages} />
          <TopRepos repos={stats?.topRepos} />
        </div>
        <OpenIssues issues={issues} />
      </main>

      <footer>
        <p>Feito com ❤️ usando a API do GitHub | <a href="https://github.com/rafaelxo/DPM" target="_blank" rel="noopener noreferrer">Ver no GitHub</a></p>
      </footer>
    </div>
  );
}

export default App;
