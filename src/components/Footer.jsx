import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  useEffect(() => {
    // Dynamic year
    document.getElementById('year').textContent = new Date().getFullYear();
  }, []);

  return (
    <footer className="footer">
      <div className="container f-grid">
        <div className="f-col">
          <div className="brand" style={{ marginBottom: '8px' }}>
            <div className="logo" aria-hidden="true"></div>
            <strong>Syncrade</strong>
          </div>
          <p style={{ margin: '0 0 10px' }}>
            Syncrade AI Hub — an AI-driven trading intelligence ecosystem. Powered by bots, signals, and risk analytics.
          </p>
          <div className="badges">
            <span className="badge">No deposits</span>
            <span className="badge">Telegram Stars only</span>
            <span className="badge">Transparency | Data | AI</span>
          </div>
        </div>

        <div className="f-col">
          <h4>Product</h4>
          <a href="#bot">Telegram Bot</a>
          <a href="#signals">Signals</a>
          <a href="#monitoring">Monitoring</a>
          <a href="#ratings">Ratings</a>
        </div>

        <div className="f-col">
          <h4>Resources</h4>
          <a href="/blog">Blog</a>
          <a href="https://t.me/syncrade" target="_blank" rel="noopener noreferrer">Community</a>
          <a href="#" aria-disabled="true">Docs (coming soon)</a>
        </div>

        <div className="f-col">
          <h4>Legal</h4>
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/disclaimer">Disclaimer</Link>
        </div>
      </div>

      <div className="container" style={{ marginTop: '18px', color: 'var(--muted)', fontSize: '12.5px' }}>
        <p style={{ margin: '0' }}>
          Risk disclaimer: Trading digital assets involves significant risk and can result of your capital. Nothing here is financial advice. Syncrade does not accept deposits; support is available via Telegram Stars only.
        </p>
        <p style={{ margin: '8px 0 0' }}>© <span id="year"></span> Syncrade. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
