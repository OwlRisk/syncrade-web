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
            <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 3l7 3v5a9 9 0 0 1-7 8 9 9 0 0 1-7-8V6l7-3Z" stroke="currentColor" strokeWidth="1.6" />
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            No deposits
          </span>
          <span className="badge" title="Support via Telegram Stars">
            <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 3.5l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.9 6.4 20.7l1.1-6.2L3 10.1l6.2-.9L12 3.5Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
            </svg>
            Telegram Stars only
          </span>
          <span className="badge" title="Risk analytics">
            <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
              <path d="M12 12l6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
            </svg>
            Risk analytics
          </span>
        </div>

        <div className="hero-ctas">
          <a className="cta" href="https://t.me/syncradebot" target="_blank" rel="noopener noreferrer">
            <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M21.8 3.2L2.7 10.5c-.9.35-.88 1.68.03 2l5.1 1.8 1.9 5.3c.32.88 1.53.92 1.97.06l2.9-5.46 5.2-9.79c.44-.83-.37-1.77-1.3-1.31Z" stroke="#0a0b10" strokeWidth="1.6" fill="white" />
            </svg>
            Launch Telegram Bot
          </a>
          <a className="ghost" href="https://t.me/syncrade" target="_blank" rel="noopener noreferrer">
            <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
              <path d="M3.5 18a5.5 5.5 0 0 1 11 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="17" cy="10" r="2" stroke="currentColor" strokeWidth="1.6" />
              <path d="M14.5 18.5a4.5 4.5 0 0 1 7 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Join Community
          </a>
          <a className="ghost" href="/blog">
            <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 5.5a3 3 0 0 1 3-3h11v18H8a3 3 0 0 0-3 3V5.5Z" stroke="currentColor" strokeWidth="1.6" />
              <path d="M8 2.5v18" stroke="currentColor" strokeWidth="1.6" />
            </svg>
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
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="4" y="5" width="16" height="14" rx="3" stroke="white" strokeWidth="1.6" opacity="0.9" />
            <circle cx="9" cy="12" r="1.6" fill="white" />
            <circle cx="15" cy="12" r="1.6" fill="white" />
          </svg>
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
            <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
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
            <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 13h4l2-7 4 16 2-9h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Confidence: Medium
          </span>
          <span className="pill">
            <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 14a8 8 0 1 1 16 0" stroke="currentColor" strokeWidth="1.6" />
              <path d="M12 14l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Risk: Balanced
          </span>
        </div>
      </div>

      <div className="msg">
        <div className="row">
          <div className="pill">
            <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 10a6 6 0 1 0-12 0c0 4-2 5-2 5h16s-2-1-2-5Z" stroke="currentColor" strokeWidth="1.6" />
              <path d="M10 20a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            Monitoring
          </div>
          <span className="spread">
            <strong>ALERT</strong> Volatility spike
          </span>
        </div>
        <div className="row">
          <span className="pill">
            <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
              <path d="M12 7v5l4 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Real-time push
          </span>
          <span className="pill">
            <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 4l6 2.5V12a7.5 7.5 0 0 1-6 7.3A7.5 7.5 0 0 1 6 12V6.5L12 4Z" stroke="currentColor" strokeWidth="1.6" />
              <path d="M9.5 12.5l1.7 1.7 3.3-3.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            No deposits
          </span>
        </div>
      </div>
    </div>
  </aside>
);

export default Hero;
