import Icon from '@/components/Icon';

const Features = () => (
  <div className="features" id="capabilities">
    <div className="card">
      <Icon name="signal-waves" />
      <h3>Onchain Q&A</h3>
      <p>Ask about any address, transaction, token, or contract — get a structured, evidence-backed explanation.</p>
    </div>
    <div className="card" id="trace">
      <Icon name="graduation-cap" />
      <h3>Trace & replay</h3>
      <p>Every output is tied to sources, time windows, and rule versions — replayable, not vibes.</p>
    </div>
    <div className="card" id="monitoring">
      <Icon name="eye" />
      <h3>Monitoring</h3>
      <p>Watchlists and alerts for onchain changes — new interactions, balance moves, and behavioral shifts.</p>
    </div>
    <div className="card" id="safety">
      <Icon name="stars" />
      <h3>Safety boundary</h3>
      <p>No trade instructions. No profit promises. Clear uncertainty and what could invalidate a judgment.</p>
    </div>
  </div>
);

export default Features;