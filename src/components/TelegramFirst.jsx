import Icon from './Icon';

const TelegramFirst = () => (
  <section id="bot">
    <div className="container stack">
      <div className="card">
        <div className="section-title">
          <Icon name="layers" />
          Telegram-first product
        </div>
        <h2 className="title">One bot. Onchain chat, monitoring, and risk context—together.</h2>
        <p className="kicker">Start in Telegram. Stay in flow. Ask questions, get traceable answers, and set alerts — without turning chat into “trade commands.”</p>
        <div className="list">
          <div className="li">
            <Icon name="check" className="li-icon" />
            <div>
              <strong>Ask anything onchain</strong>
              <span>Paste an address / tx hash / contract and ask what changed, what it means, and what’s uncertain.</span>
            </div>
          </div>
          <div className="li">
            <Icon name="check" className="li-icon" />
            <div>
              <strong>Evidence-first outputs</strong>
              <span>Every answer references sources, time windows, and rules — designed for replay, not persuasion.</span>
            </div>
          </div>
          <div className="li">
            <Icon name="check" className="li-icon" />
            <div>
              <strong>Monitoring & alerts</strong>
              <span>Track addresses, contracts, and tokens. Get notified when meaningful onchain behavior changes.</span>
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
          <strong>Traceability</strong>
          <span>Structured judgments tied to sources, windows, and versions — so you can verify and replay.</span>
        </div>
      </div>
      <div className="li">
        <Icon name="plus" className="li-icon" />
        <div>
          <strong>Data first</strong>
          <span>Outputs are grounded in observable data and deterministic rules — not model “belief.”</span>
        </div>
      </div>
      <div className="li">
        <Icon name="ai-native" className="li-icon" />
        <div>
          <strong>Restraint</strong>
          <span>No buy/sell instructions. No profit promises. Clear uncertainty and refusal when requests cross the line.</span>
        </div>
      </div>
    </div>
  </div>
);

export default TelegramFirst;