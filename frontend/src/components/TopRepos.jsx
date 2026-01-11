function TopRepos({ repos }) {
  if (!repos) return null;

  return (
    <div className="card top-repos">
      <h3>🏆 Top Repositórios</h3>
      <div className="repos-list">
        {repos.map((repo) => (
          <a
            key={repo.id}
            href={repo. html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="repo-item"
          >
            <div className="repo-header">
              <span className="repo-name">{repo.name}</span>
              <span className="repo-stars">⭐ {repo.stargazers_count}</span>
            </div>
            {repo.description && (
              <p className="repo-description">{repo.description}</p>
            )}
            <div className="repo-footer">
              {repo.language && (
                <span className="repo-language">💻 {repo.language}</span>
              )}
              <span className="repo-forks">🔱 {repo.forks_count}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default TopRepos;
