const express = require('express');
const cors = require('cors');
const { Octokit } = require('@octokit/rest');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Inicializa Octokit
const octokit = new Octokit({
  auth: process.env. GITHUB_TOKEN
});

// Rota:  Informações do usuário
app.get('/api/user', async (req, res) => {
  try {
    const { data } = await octokit.rest. users.getAuthenticated();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota: Repositórios do usuário
app.get('/api/repos', async (req, res) => {
  try {
    const { data } = await octokit.rest.repos.listForAuthenticatedUser({
      sort: 'updated',
      per_page: 100
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota: Commits recentes
app.get('/api/commits/: owner/:repo', async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const { data } = await octokit.rest.repos.listCommits({
      owner,
      repo,
      per_page: 100
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota: Estatísticas de contribuições
app.get('/api/stats', async (req, res) => {
  try {
    const user = await octokit.rest. users.getAuthenticated();
    const repos = await octokit. rest.repos.listForAuthenticatedUser({
      per_page: 100
    });

    // Calcula estatísticas
    const totalStars = repos.data.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    const totalForks = repos.data.reduce((acc, repo) => acc + repo.forks_count, 0);

    // Linguagens mais usadas
    const languages = {};
    for (const repo of repos.data) {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    }

    res. json({
      username: user.data.login,
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
    res.status(500).json({ error: error.message });
  }
});

// Rota: Issues abertas
app.get('/api/issues', async (req, res) => {
  try {
    const { data } = await octokit.rest.issues.listForAuthenticatedUser({
      filter: 'all',
      state: 'open',
      per_page: 50
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
