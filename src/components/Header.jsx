const Header = () => (
  <header>
    <div className="container nav">
      <div className="brand">
        <div className="logo" aria-hidden="true"></div>
        <a href="#" aria-label="Syncrade home">
          Syncrade
        </a>
      </div>
      <nav className="nav-links" aria-label="Primary">
        <a href="#bot">Telegram Bot</a>
        <a href="#signals">Signals</a>
        <a href="#education">Education</a>
        <a href="#monitoring">Monitoring</a>
        <a href="#ratings">Ratings</a>
        <a href="/blog">Blog</a>
        <a href="https://t.me/syncrade" target="_blank" rel="noopener noreferrer">Community</a>
      </nav>
      <a className="cta" href="https://t.me/syncradebot" target="_blank" rel="noopener noreferrer" aria-label="Launch Syncrade Telegram Bot">
        <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M21.8 3.2L2.7 10.5c-.9.35-.88 1.68.03 2l5.1 1.8 1.9 5.3c.32.88 1.53.92 1.97.06l2.9-5.46 5.2-9.79c.44-.83-.37-1.77-1.3-1.31Z" stroke="#0a0b10" strokeWidth="1.6" fill="white" />
        </svg>
        Launch Bot
      </a>
    </div>
  </header>
);

export default Header;
