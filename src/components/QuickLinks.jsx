const QuickLinks = () => (
  <section>
    <div className="container">
      <div className="card" style={{ padding: '24px' }}>
        <div className="section-title">
          <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 12a4 4 0 0 1 4-4h4a4 4 0 1 1 0 8h-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M15 12a4 4 0 0 1-4 4H7a4 4 0 1 1 0-8h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          Quick links
        </div>
        <div className="badges" style={{ margin: '6px 0 0' }}>
          <a className="badge" href="https://t.me/syncradebot" target="_blank" rel="noopener noreferrer">
            Open Telegram Bot
          </a>
          <a className="badge" href="https://t.me/syncrade" target="_blank" rel="noopener noreferrer">
            Join Syncrade AI Hub
          </a>
          <a className="badge" href="/blog">Visit Blog</a>
        </div>
      </div>
    </div>
  </section>
);

export default QuickLinks;
