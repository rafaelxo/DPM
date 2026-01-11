function OpenIssues({ issues }) {
  if (!issues || issues.length === 0) return null;

  return (
    <div className="card open-issues">
      <h3>🎯 Issues Abertas ({issues.length})</h3>
      <div className="issues-list">
        {issues.slice(0, 10).map((issue) => (
          <a
            key={issue.id}
            href={issue.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="issue-item"
          >
            <div className="issue-header">
              <span className="issue-title">{issue.title}</span>
              <span className="issue-repo">
                {issue.repository_url. split('/').slice(-2).join('/')}
              </span>
            </div>
            <div className="issue-footer">
              <span className="issue-date">
                📅 {new Date(issue. created_at).toLocaleDateString('pt-BR')}
              </span>
              {issue.labels.length > 0 && (
                <div className="issue-labels">
                  {issue.labels. slice(0, 3).map((label) => (
                    <span key={label. id} className="issue-label">
                      {label.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default OpenIssues;
