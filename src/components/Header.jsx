import Icon from './Icon';

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
        <Icon name="paper-plane" />
        Launch Bot
      </a>
    </div>
  </header>
);

export default Header;