import Icon from './Icon';

const Features = () => (
  <div className="features" id="signals">
    <div className="card">
      <Icon name="signal-waves" />
      <h3>Signals</h3>
      <p>Algorithmic trade signals with clear entry, levels, and risk context to keep you decisive.</p>
    </div>
    <div className="card" id="education">
      <Icon name="graduation-cap" />
      <h3>Education</h3>
      <p>Market structure, playbooks, and tutorials designed to turn signals into repeatable decisions.</p>
    </div>
    <div className="card" id="monitoring">
      <Icon name="eye" />
      <h3>Monitoring</h3>
      <p>Real-time market monitoring with alerts that surface meaningful moves, not noise.</p>
    </div>
    <div className="card" id="ratings">
      <Icon name="stars" />
      <h3>Ratings</h3>
      <p>Data-led ratings and risk scoring to benchmark tokens, strategies, and signal quality.</p>
    </div>
  </div>
);

export default Features;