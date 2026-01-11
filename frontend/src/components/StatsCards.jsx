function StatsCards({ stats }) {
  if (!stats) return null;

  return (
    <div className="stats-cards">
      <div className="card stat-card">
        <div className="stat-icon">⭐</div>
        <div className="stat-content">
          <h3>{stats.totalStars}</h3>
          <p>Total de Stars</p>
        </div>
      </div>

      <div className="card stat-card">
        <div className="stat-icon">🔱</div>
        <div className="stat-content">
          <h3>{stats.totalForks}</h3>
          <p>Total de Forks</p>
        </div>
      </div>

      <div className="card stat-card">
        <div className="stat-icon">📁</div>
        <div className="stat-content">
          <h3>{stats.publicRepos}</h3>
          <p>Repositórios Públicos</p>
        </div>
      </div>

      <div className="card stat-card">
        <div className="stat-icon">💻</div>
        <div className="stat-content">
          <h3>{Object.keys(stats.languages || {}).length}</h3>
          <p>Linguagens Usadas</p>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;
