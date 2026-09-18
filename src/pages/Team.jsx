function Team() {
  const members = [
    { name: 'Sarah Chen', role: 'Engineering Lead', status: 'online', initials: 'SC' },
    { name: 'Alex Rivera', role: 'Frontend Developer', status: 'online', initials: 'AR' },
    { name: 'Jordan Lee', role: 'DevOps Engineer', status: 'offline', initials: 'JL' },
    { name: 'Maria Garcia', role: 'Backend Developer', status: 'online', initials: 'MG' },
    { name: 'Chris Park', role: 'Product Designer', status: 'online', initials: 'CP' },
    { name: 'Taylor Kim', role: 'QA Engineer', status: 'offline', initials: 'TK' },
  ]

  return (
    <div className="page">
      <div className="page-header">
        <h1>Team</h1>
        <p className="page-subtitle">Your team members and their current status</p>
      </div>

      <div className="team-grid">
        {members.map((member) => (
          <div key={member.name} className="team-card">
            <div className="member-avatar">
              <span className="member-initials">{member.initials}</span>
              <span className={`status-indicator ${member.status}`} />
            </div>
            <h3 className="member-name">{member.name}</h3>
            <p className="member-role">{member.role}</p>
            <span className={`status-badge ${member.status}`}>
              {member.status === 'online' ? 'Online' : 'Offline'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Team
