function LanguageChart({ languages }) {
  if (!languages) return null;

  const sortedLanguages = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const total = sortedLanguages.reduce((acc, [, count]) => acc + count, 0);

  const colors = ['#3178c6', '#f1e05a', '#e34c26', '#563d7c', '#89e051'];

  return (
    <div className="card language-chart">
      <h3>🎨 Linguagens Mais Usadas</h3>
      <div className="language-list">
        {sortedLanguages.map(([lang, count], index) => {
          const percentage = ((count / total) * 100).toFixed(1);
          return (
            <div key={lang} className="language-item">
              <div className="language-header">
                <span className="language-name">
                  <span
                    className="language-dot"
                    style={{ backgroundColor: colors[index] }}
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
                    backgroundColor: colors[index]
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
