import Icon from './Icon';

const QuickLinks = () => (
  <section>
    <div className="container">
      <div className="card" style={{ padding: '24px' }}>
        <div className="section-title">
          <Icon name="link" />
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