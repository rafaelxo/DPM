function LanguageChart({ languages }) {
  if (!languages || Object.keys(languages).length === 0) {
    return (
      <div className="card language-chart">
        <h3>🎨 Linguagens Mais Usadas</h3>
        <p style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
          Nenhuma linguagem encontrada
        </p>
      </div>
    );
  }

  const sortedLanguages = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const total = sortedLanguages.reduce((acc, [, count]) => acc + count, 0);

  const colors = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'Python': '#3572A5',
    'Java': '#b07219',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'Ruby': '#701516',
    'PHP': '#4F5D95',
    'C++': '#f34b7d',
    'C':  '#555555',
    'C#':  '#178600',
    'Shell':  '#89e051',
    'Swift': '#ffac45',
    'Kotlin':  '#A97BFF',
    'default': '#858585'
  };

  return (
    <div className="card language-chart">
      <h3>🎨 Linguagens Mais Usadas</h3>
      <div className="language-list">
        {sortedLanguages.map(([lang, count]) => {
          const percentage = ((count / total) * 100).toFixed(1);
          const color = colors[lang] || colors.default;

          return (
            <div key={lang} className="language-item">
              <div className="language-header">
                <span className="language-name">
                  <span
                    className="language-dot"
                    style={{ backgroundColor: color }}
                  ></span>
                  {lang}
                </span>
                <span className="language-percentage">{percentage}%</span>
              </div>
              <div className="language-bar">
                <div
                  className="language-bar-fill"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: color
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LanguageChart;
