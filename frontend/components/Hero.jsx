import Icon from '@/components/Icon';

const Hero = () => (
  <section className="hero">
    <div className="container hero-inner">
      <div>
        <div className="eyebrow">
          <span>Telegram-first onchain AI chat</span>
          <span className="sep">|</span>
          <span>Evidence</span>
          <span className="sep">|</span>
          <span>Replayability</span>
          <span className="sep">|</span>
          <span>Restraint</span>
        </div>

        <h1 className="h1">Ask anything onchain.<br />Get traceable answers.</h1>
        <p className="sub">
          Syncrade is a judgment-first AI chat for blockchain investigation — addresses, transactions, tokens, and contracts.
          Evidence in, structured output out. No trade instructions.
        </p>

        <div className="badges">
          <span className="badge" title="Evidence-first, replayable outputs">
            <Icon name="shield-check" />
            Evidence-first
          </span>
          <span className="badge" title="Every result can be traced and replayed">
            <Icon name="radar" />
            Replayable
          </span>
          <span className="badge" title="No custody, no deposits">
            <Icon name="star" />
            No deposits (Stars support)
          </span>
        </div>

        <div className="hero-ctas">
          <a className="cta" href="https://t.me/syncradebot" target="_blank" rel="noopener noreferrer">
            <Icon name="paper-plane" />
            Open Telegram Bot
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
            Query
          </div>
          <span className="spread">
            <strong>ADDRESS</strong> 0x…7f2a
          </span>
        </div>
        <div className="row">
          <span className="spread">
            <strong>Observation</strong> Activity increased vs 30d baseline
          </span>
        </div>
        <div className="row">
          <span className="pill">
            <Icon name="activity" />
            Uncertainty: Medium
          </span>
          <span className="pill">
            <Icon name="gauge" />
            Trace: 12 txs (7d)
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
            <strong>ALERT</strong> New contract interaction detected
          </span>
        </div>
        <div className="row">
          <span className="pill">
            <Icon name="clock" />
            Real-time push
          </span>
          <span className="pill">
            <Icon name="shield-check-2" />
            No custody
          </span>
        </div>
      </div>
    </div>
  </aside>
);

export default Hero;