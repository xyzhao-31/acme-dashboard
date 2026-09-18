function Dashboard() {
  const metrics = [
    { label: 'Active Projects', value: '12', change: '+2 this month', changeType: 'positive' },
    { label: 'Open Issues', value: '47', change: '-5 from last week', changeType: 'positive' },
    { label: 'Team Members', value: '8', change: '1 new hire', changeType: 'neutral' },
    { label: 'Uptime', value: '99.9%', change: 'Last 30 days', changeType: 'neutral' },
  ]

  const activities = [
    { time: '2 minutes ago', description: 'Sarah Chen merged PR #142 - Update payment flow', type: 'merge' },
    { time: '15 minutes ago', description: 'Alex Rivera opened issue #89 - Mobile nav not responsive', type: 'issue' },
    { time: '1 hour ago', description: 'Jordan Lee deployed v2.4.1 to production', type: 'deploy' },
    { time: '3 hours ago', description: 'Maria Garcia completed code review for auth module', type: 'review' },
    { time: '5 hours ago', description: 'Chris Park added new monitoring dashboard', type: 'feature' },
    { time: 'Yesterday', description: 'Team standup notes updated by Sarah Chen', type: 'update' },
  ]

  return (
    <div className="page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p className="page-subtitle">Overview of your team's performance</p>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric) => (
          <div key={metric.label} className="metric-card">
            <span className="metric-label">{metric.label}</span>
            <span className="metric-value">{metric.value}</span>
            <span className={`metric-change ${metric.changeType}`}>{metric.change}</span>
          </div>
        ))}
      </div>

      <div className="section">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {activities.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className={`activity-dot ${activity.type}`} />
              <div className="activity-content">
                <p className="activity-description">{activity.description}</p>
                <span className="activity-time">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
