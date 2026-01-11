function UserProfile({ user }) {
  if (!user) return null;

  return (
    <div className="user-profile card">
      <img src={user.avatar_url} alt={user.login} className="avatar" />
      <div className="user-info">
        <h2>{user.name || user.login}</h2>
        <p className="username">@{user.login}</p>
        {user.bio && <p className="bio">{user.bio}</p>}
        <div className="user-stats">
          <div className="stat">
            <span className="stat-value">{user.followers}</span>
            <span className="stat-label">Seguidores</span>
          </div>
          <div className="stat">
            <span className="stat-value">{user.following}</span>
            <span className="stat-label">Seguindo</span>
          </div>
          <div className="stat">
            <span className="stat-value">{user.public_repos}</span>
            <span className="stat-label">Repositórios</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
