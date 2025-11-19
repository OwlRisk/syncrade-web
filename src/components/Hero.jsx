import Icon from './Icon';

const Hero = () => (
  <section className="hero">
    <div className="container hero-inner">
      <div>
        <div className="eyebrow">
          <span>Official community of Syncrade AI Hub</span>
          <span className="sep">|</span>
          <span>Transparency</span>
          <span className="sep">|</span>
          <span>Data</span>
          <span className="sep">|</span>
          <span>AI</span>
        </div>

        <h1 className="h1">AI-driven trading intelligence<br />for blockchain markets</h1>
        <p className="sub">Powered by bots, signals, and risk analytics. No deposits. Support via Telegram Stars only.</p>

        <div className="badges">
          <span className="badge" title="No deposits required">
            <Icon name="shield-check" />
            No deposits
          </span>
          <span className="badge" title="Support via Telegram Stars">
            <Icon name="star" />
            Telegram Stars only
          </span>
          <span className="badge" title="Risk analytics">
            <Icon name="radar" />
            Risk analytics
          </span>
        </div>

        <div className="hero-ctas">
          <a className="cta" href="https://t.me/syncradebot" target="_blank" rel="noopener noreferrer">
            <Icon name="paper-plane" />
            Launch Telegram Bot
          </a>
          <a className="ghost" href="https://t.me/syncrade" target="_blank" rel="noopener noreferrer">
            <Icon name="people" />
            Join Community
          </a>
          <a className="ghost" href="https://blog.syncrade.com" target="_blank" rel="noopener noreferrer">
            <Icon name="book" />
            Read the Blog
          </a>
        </div>
      </div>
      <BotPreview />
    </div>
  </section>
);

const BotPreview = () => (
  <aside className="bot-card" id="bot" aria-label="Telegram bot preview">
    <div className="bot-header">
      <div className="bot-id">
        <div className="bot-avatar" aria-hidden="true">
          <Icon name="bot" width="18" height="18" />
        </div>
        <div>
          <div className="bot-name">Syncrade Bot</div>
          <div className="bot-tag">@syncradebot</div>
        </div>
      </div>
      <a className="ghost" href="https://t.me/syncradebot" target="_blank" rel="noopener noreferrer">Open in Telegram</a>
    </div>

    <div className="bot-body">
      <div className="msg">
        <div className="row">
          <div className="pill">
            <Icon name="bolt" />
            Signal
          </div>
          <span className="spread">
            <strong>PAIR</strong> BTC/USDT
          </span>
        </div>
        <div className="row">
          <div className="levels">
            <span className="lvl"><strong>Entry</strong> 67,420</span>
            <span className="lvl"><strong>Target 1</strong> 68,200</span>
            <span className="lvl"><strong>Target 2</strong> 69,050</span>
            <span className="lvl"><strong>Invalidation</strong> 66,580</span>
          </div>
        </div>
        <div className="row">
          <span className="pill">
            <Icon name="activity" />
            Confidence: Medium
          </span>
          <span className="pill">
            <Icon name="gauge" />
            Risk: Balanced
          </span>
        </div>
      </div>

      <div className="msg">
        <div className="row">
          <div className="pill">
            <Icon name="bell" />
            Monitoring
          </div>
          <span className="spread">
            <strong>ALERT</strong> Volatility spike
          </span>
        </div>
        <div className="row">
          <span className="pill">
            <Icon name="clock" />
            Real-time push
          </span>
          <span className="pill">
            <Icon name="shield-check-2" />
            No deposits
          </span>
        </div>
      </div>
    </div>
  </aside>
);

export default Hero;