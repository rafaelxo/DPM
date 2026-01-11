const express = require('express');
const cors = require('cors');
const { Octokit } = require('@octokit/rest');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Inicializa Octokit com o token do GitHub
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

// Rota de teste
app.get('/', (req, res) => {
  res.json({
    message: '🚀 GitHub Dashboard API está rodando!',
    endpoints: [
      '/api/user',
      '/api/repos',
      '/api/stats',
      '/api/issues',
      '/api/commits/: owner/:repo'
    ]
  });
});

// Rota:  Informações do usuário autenticado
app.get('/api/user', async (req, res) => {
  try {
    const { data } = await octokit.rest.users.getAuthenticated();
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error. message);
    res.status(500).json({
      error: error.message,
      message: 'Erro ao buscar informações do usuário'
    });
  }
});

// Rota:  Repositórios do usuário
app. get('/api/repos', async (req, res) => {
  try {
    const { data } = await octokit.rest. repos.listForAuthenticatedUser({
      sort: 'updated',
      per_page: 100
    });
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar repositórios:', error.message);
    res.status(500).json({
      error: error.message,
      message: 'Erro ao buscar repositórios'
    });
  }
});

// Rota: Commits de um repositório específico
app.get('/api/commits/:owner/:repo', async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const { data } = await octokit.rest.repos.listCommits({
      owner,
      repo,
      per_page: 100
    });
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar commits:', error.message);
    res.status(500).json({
      error: error.message,
      message: 'Erro ao buscar commits'
    });
  }
});

// Rota: Estatísticas compiladas
app.get('/api/stats', async (req, res) => {
  try {
    // Busca dados do usuário
    const user = await octokit.rest. users.getAuthenticated();

    // Busca repositórios
    const repos = await octokit.rest.repos. listForAuthenticatedUser({
      per_page: 100
    });

    // Calcula total de stars
    const totalStars = repos.data.reduce((acc, repo) => acc + repo.stargazers_count, 0);

    // Calcula total de forks
    const totalForks = repos.data.reduce((acc, repo) => acc + repo.forks_count, 0);

    // Conta linguagens mais usadas
    const languages = {};
    for (const repo of repos.data) {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    }

    // Monta resposta
    res.json({
      username: user.data.login,
      name: user.data.name,
      avatar: user.data.avatar_url,
      followers: user.data.followers,
      following: user.data.following,
      publicRepos: user.data.public_repos,
      totalStars,
      totalForks,
      languages,
      topRepos: repos.data
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5)
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error.message);
    res.status(500).json({
      error: error. message,
      message: 'Erro ao buscar estatísticas'
    });
  }
});

// Rota: Issues abertas do usuário
app.get('/api/issues', async (req, res) => {
  try {
    const { data } = await octokit.rest.issues.listForAuthenticatedUser({
      filter: 'all',
      state: 'open',
      per_page: 50,
      sort: 'updated',
      direction: 'desc'
    });
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar issues:', error.message);
    res.status(500).json({
      error: error.message,
      message: 'Erro ao buscar issues'
    });
  }
});

// Rota: Atividade recente (eventos)
app.get('/api/activity', async (req, res) => {
  try {
    const user = await octokit.rest. users.getAuthenticated();
    const { data } = await octokit. rest.activity.listPublicEventsForUser({
      username: user.data.login,
      per_page: 30
    });
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar atividade:', error.message);
    res.status(500).json({
      error: error.message,
      message: 'Erro ao buscar atividade'
    });
  }
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    availableEndpoints: [
      '/api/user',
      '/api/repos',
      '/api/stats',
      '/api/issues',
      '/api/activity',
      '/api/commits/:owner/:repo'
    ]
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 Acesse: http://localhost:${PORT}`);
});
