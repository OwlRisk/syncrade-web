const Features = () => (
  <div className="features" id="signals">
    <div className="card">
      <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M2 12h3M19 12h3M6 12c2-4 10-4 12 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <h3>Signals</h3>
      <p>Algorithmic trade signals with clear entry, levels, and risk context to keep you decisive.</p>
    </div>
    <div className="card" id="education">
      <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 9l9-4 9 4-9 4-9-4Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 11v5c3 2 7 2 10 0v-5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
      <h3>Education</h3>
      <p>Market structure, playbooks, and tutorials designed to turn signals into repeatable decisions.</p>
    </div>
    <div className="card" id="monitoring">
      <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
      </svg>
      <h3>Monitoring</h3>
      <p>Real-time market monitoring with alerts that surface meaningful moves, not noise.</p>
    </div>
    <div className="card" id="ratings">
      <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3.3l2.4 4.9 5.4.8-3.9 3.8.9 5.3L12 15.9 7.2 18.1l.9-5.3-3.9-3.8 5.4-.8L12 3.3Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      </svg>
      <h3>Ratings</h3>
      <p>Data-led ratings and risk scoring to benchmark tokens, strategies, and signal quality.</p>
    </div>
  </div>
);

export default Features;
