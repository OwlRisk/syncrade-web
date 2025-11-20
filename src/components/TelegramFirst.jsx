import Icon from './Icon';

const TelegramFirst = () => (
  <section id="bot">
    <div className="container stack">
      <div className="card">
        <div className="section-title">
          <Icon name="layers" />
          Telegram-first product
        </div>
        <h2 className="title">One bot. Signals, monitoring, and risk—together.</h2>
        <p className="kicker">Start in Telegram. Stay in flow. Syncrade’s bot surfaces opportunities and context in real time.</p>
        <div className="list">
          <div className="li">
            <Icon name="check" className="li-icon" />
            <div>
              <strong>Actionable signals</strong>
              <span>Entries, targets, invalidation, and confidence—so you can act with discipline.</span>
            </div>
          </div>
          <div className="li">
            <Icon name="check" className="li-icon" />
            <div>
              <strong>Risk analytics</strong>
              <span>Risk-weighted views and ratings to compare setups and strategies.</span>
            </div>
          </div>
          <div className="li">
            <Icon name="check" className="li-icon" />
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
      <Icon name="shield" />
      Principles
    </div>
    <div className="list">
      <div className="li">
        <Icon name="shield-check" className="li-icon" />
        <div>
          <strong>Transparency</strong>
          <span>Clear methodology, visible performance, and data-backed decisions.</span>
        </div>
      </div>
      <div className="li">
        <Icon name="plus" className="li-icon" />
        <div>
          <strong>Data first</strong>
          <span>Everything grounded in measurable signals and risk context.</span>
        </div>
      </div>
      <div className="li">
        <Icon name="ai-native" className="li-icon" />
        <div>
          <strong>AI-native</strong>
          <span>Automation and intelligence where it matters—timing, context, and risk.</span>
        </div>
      </div>
    </div>
  </div>
);

export default TelegramFirst;