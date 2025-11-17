const TelegramFirst = () => (
  <section>
    <div className="container stack">
      <div className="card">
        <div className="section-title">
          <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 3l9 5-9 5-9-5 9-5Z" stroke="currentColor" strokeWidth="1.6" />
            <path d="M3 13l9 5 9-5" stroke="currentColor" strokeWidth="1.6" opacity=".8" />
          </svg>
          Telegram-first product
        </div>
        <h2 className="title">One bot. Signals, monitoring, and risk—together.</h2>
        <p className="kicker">Start in Telegram. Stay in flow. Syncrade’s bot surfaces opportunities and context in real time.</p>
        <div className="list">
          <div className="li">
            <svg className="li-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <strong>Actionable signals</strong>
              <span>Entries, targets, invalidation, and confidence—so you can act with discipline.</span>
            </div>
          </div>
          <div className="li">
            <svg className="li-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <strong>Risk analytics</strong>
              <span>Risk-weighted views and ratings to compare setups and strategies.</span>
            </div>
          </div>
          <div className="li">
            <svg className="li-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <strong>Education built-in</strong>
              <span>From definitions to playbooks, learn while you trade—then dive deeper on the blog.</span>
            </div>
          </div>
        </div>
      </div>
      <Principles />
    </div>
    <div className="container foot">
      <div>
        <strong>Get started in seconds</strong> — open the bot and follow the prompts.
      </div>
      <div style={{ textAlign: 'right' }}>
        <a className="ghost" href="https://t.me/syncradebot" target="_blank" rel="noopener noreferrer">
          Launch Bot
        </a>
      </div>
    </div>
  </section>
);

const Principles = () => (
  <div className="card">
    <div className="section-title">
      <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3l7 3v5a9 9 0 0 1-7 8 9 9 0 0 1-7-8V6l7-3Z" stroke="currentColor" strokeWidth="1.6" />
      </svg>
      Principles
    </div>
    <div className="list">
      <div className="li">
        <svg className="li-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3l8 3.5V12a8 8 0 0 1-8 8 8 8 0 0 1-8-8V6.5L12 3Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div>
          <strong>Transparency</strong>
          <span>Clear methodology, visible performance, and data-backed decisions.</span>
        </div>
      </div>
      <div className="li">
        <svg className="li-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 12h18M12 3v18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <div>
          <strong>Data first</strong>
          <span>Everything grounded in measurable signals and risk context.</span>
        </div>
      </div>
      <div className="li">
        <svg className="li-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <div>
          <strong>AI-native</strong>
          <span>Automation and intelligence where it matters—timing, context, and risk.</span>
        </div>
      </div>
    </div>
  </div>
);

export default TelegramFirst;
