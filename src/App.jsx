import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    document.getElementById('year').textContent = new Date().getFullYear();

    const body = document.body;
    let raf = null;

    function move(e) {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        body.style.background = `
          radial-gradient(1200px 600px at ${x}% ${y - 10}% , rgba(123,108,255,0.18), transparent 60%),
          radial-gradient(900px 500px at ${Math.max(0, x - 60)}% 30%, rgba(0,194,255,0.14), transparent 60%),
          linear-gradient(180deg, #07090e, #0e1422 60%, #0b0f18)
        `;
      });
    }

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!media.matches) {
      window.addEventListener('mousemove', move);
    }

    return () => {
      if (!media.matches) {
        window.removeEventListener('mousemove', move);
      }
    };
  }, []);

  return (
    <>
      <div className="grid-overlay" aria-hidden="true"></div>

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
              <path d="M21.8 3.2L2.7 10.5c-.9.35-.88 1.68.03 2l5.1 1.8 1.9 5.3c.32.88 1.53.92 1.97.06l2.9-5.46 5.2-9.79c.44-.83-.37-1.77-1.3-1.31Z" stroke="#0a0b10" strokeWidth="1.6" fill="white"/>
            </svg>
            Launch Bot
          </a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-inner">
            <div>
              <div className="eyebrow">
                <span>Official community of Syncrade AI Hub</span>
                <span className="sep">|</span>
                <span>Transparency</span>
                <span className="sep">|</span>
                <span>Data</span>
                <span className="sep">|</span>
                <span>AI</span>
              </div>

              <h1 className="h1">AI-driven trading intelligence<br />for blockchain markets</h1>
              <p className="sub">Powered by bots, signals, and risk analytics. No deposits. Support via Telegram Stars only.</p>

              <div className="badges">
                <span className="badge" title="No deposits required">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3l7 3v5a9 9 0 0 1-7 8 9 9 0 0 1-7-8V6l7-3Z" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  No deposits
                </span>
                <span className="badge" title="Support via Telegram Stars">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3.5l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.9 6.4 20.7l1.1-6.2L3 10.1l6.2-.9L12 3.5Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round"/>
                  </svg>
                  Telegram Stars only
                </span>
                <span className="badge" title="Risk analytics">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M12 12l6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                    <circle cx="12" cy="12" r="2" fill="currentColor"/>
                  </svg>
                  Risk analytics
                </span>
              </div>

              <div className="hero-ctas">
                <a className="cta" href="https://t.me/syncradebot" target="_blank" rel="noopener noreferrer">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M21.8 3.2L2.7 10.5c-.9.35-.88 1.68.03 2l5.1 1.8 1.9 5.3c.32.88 1.53.92 1.97.06l2.9-5.46 5.2-9.79c.44-.83-.37-1.77-1.3-1.31Z" stroke="#0a0b10" strokeWidth="1.6" fill="white"/>
                  </svg>
                  Launch Telegram Bot
                </a>
                <a className="ghost" href="https://t.me/syncrade" target="_blank" rel="noopener noreferrer">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M3.5 18a5.5 5.5 0 0 1 11 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                    <circle cx="17" cy="10" r="2" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M14.5 18.5a4.5 4.5 0 0 1 7 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                  Join Community
                </a>
                <a className="ghost" href="/blog">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 5.5a3 3 0 0 1 3-3h11v18H8a3 3 0 0 0-3 3V5.5Z" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M8 2.5v18" stroke="currentColor" strokeWidth="1.6"/>
                  </svg>
                  Read the Blog
                </a>
              </div>

              <div className="features" id="signals">
                <div className="card">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M2 12h3M19 12h3M6 12c2-4 10-4 12 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                  <h3>Signals</h3>
                  <p>Algorithmic trade signals with clear entry, levels, and risk context to keep you decisive.</p>
                </div>
                <div className="card" id="education">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M3 9l9-4 9 4-9 4-9-4Z" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M7 11v5c3 2 7 2 10 0v-5" stroke="currentColor" strokeWidth="1.6"/>
                  </svg>
                  <h3>Education</h3>
                  <p>Market structure, playbooks, and tutorials designed to turn signals into repeatable decisions.</p>
                </div>
                <div className="card" id="monitoring">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" stroke="currentColor" strokeWidth="1.6"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6"/>
                  </svg>
                  <h3>Monitoring</h3>
                  <p>Real-time market monitoring with alerts that surface meaningful moves, not noise.</p>
                </div>
                <div className="card" id="ratings">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3.3l2.4 4.9 5.4.8-3.9 3.8.9 5.3L12 15.9 7.2 18.1l.9-5.3-3.9-3.8 5.4-.8L12 3.3Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round"/>
                  </svg>
                  <h3>Ratings</h3>
                  <p>Data-led ratings and risk scoring to benchmark tokens, strategies, and signal quality.</p>
                </div>
              </div>
            </div>

            <aside className="bot-card" id="bot" aria-label="Telegram bot preview">
              <div className="bot-header">
                <div className="bot-id">
                  <div className="bot-avatar" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="4" y="5" width="16" height="14" rx="3" stroke="white" strokeWidth="1.6" opacity="0.9"/>
                      <circle cx="9" cy="12" r="1.6" fill="white"/>
                      <circle cx="15" cy="12" r="1.6" fill="white"/>
                    </svg>
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
                      <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                      </svg>
                      Signal
                    </div>
                    <span className="spread">
                      <strong>PAIR</strong> BTC/USDT
                    </span>
                  </div>
                  <div className="row">
                    <div className="levels">
                      <span className="lvl"><strong>Entry</strong> 67,420</span>
                      <span className="lvl"><strong>Target 1</strong> 68,200</span>
                      <span className="lvl"><strong>Target 2</strong> 69,050</span>
                      <span className="lvl"><strong>Invalidation</strong> 66,580</span>
                    </div>
                  </div>
                  <div className="row">
                    <span className="pill">
                      <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M3 13h4l2-7 4 16 2-9h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Confidence: Medium
                    </span>
                    <span className="pill">
                      <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M4 14a8 8 0 1 1 16 0" stroke="currentColor" strokeWidth="1.6"/>
                        <path d="M12 14l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                      </svg>
                      Risk: Balanced
                    </span>
                  </div>
                </div>

                <div className="msg">
                  <div className="row">
                    <div className="pill">
                      <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M18 10a6 6 0 1 0-12 0c0 4-2 5-2 5h16s-2-1-2-5Z" stroke="currentColor" strokeWidth="1.6"/>
                        <path d="M10 20a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6"/>
                      </svg>
                      Monitoring
                    </div>
                    <span className="spread">
                      <strong>ALERT</strong> Volatility spike
                    </span>
                  </div>
                  <div className="row">
                    <span className="pill">
                      <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6"/>
                        <path d="M12 7v5l4 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                      </svg>
                      Real-time push
                    </span>
                    <span className="pill">
                      <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 4l6 2.5V12a7.5 7.5 0 0 1-6 7.3A7.5 7.5 0 0 1 6 12V6.5L12 4Z" stroke="currentColor" strokeWidth="1.6"/>
                        <path d="M9.5 12.5l1.7 1.7 3.3-3.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      No deposits
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section>
          <div className="container stack">
            <div className="card">
              <div className="section-title">
                <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3l9 5-9 5-9-5 9-5Z" stroke="currentColor" strokeWidth="1.6"/>
                  <path d="M3 13l9 5 9-5" stroke="currentColor" strokeWidth="1.6" opacity=".8"/>
                </svg>
                Telegram-first product
              </div>
              <h2 className="title">One bot. Signals, monitoring, and risk—together.</h2>
              <p className="kicker">Start in Telegram. Stay in flow. Syncrade’s bot surfaces opportunities and context in real time.</p>
              <div className="list">
                <div className="li">
                  <svg className="li-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <strong>Actionable signals</strong>
                    <span>Entries, targets, invalidation, and confidence—so you can act with discipline.</span>
                  </div>
                </div>
                <div className="li">
                  <svg className="li-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <strong>Risk analytics</strong>
                    <span>Risk-weighted views and ratings to compare setups and strategies.</span>
                  </div>
                </div>
                <div className="li">
                  <svg className="li-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <strong>Education built-in</strong>
                    <span>From definitions to playbooks, learn while you trade—then dive deeper on the blog.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="section-title">
                <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3l7 3v5a9 9 0 0 1-7 8 9 9 0 0 1-7-8V6l7-3Z" stroke="currentColor" strokeWidth="1.6"/>
                </svg>
                Principles
              </div>
              <div className="list">
                <div className="li">
                  <svg className="li-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3l8 3.5V12a8 8 0 0 1-8 8 8 8 0 0 1-8-8V6.5L12 3Z" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <strong>Transparency</strong>
                    <span>Clear methodology, visible performance, and data-backed decisions.</span>
                  </div>
                </div>
                <div className="li">
                  <svg className="li-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M3 12h18M12 3v18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                  <div>
                    <strong>Data first</strong>
                    <span>Everything grounded in measurable signals and risk context.</span>
                  </div>
                </div>
                <div className="li">
                  <svg className="li-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                  <div>
                    <strong>AI-native</strong>
                    <span>Automation and intelligence where it matters—timing, context, and risk.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container foot">
            <div>
              <strong>Get started in seconds</strong> — open the bot and follow the prompts.
            </div>
            <div style={{textAlign: 'right'}}>
              <a className="ghost" href="https://t.me/syncradebot" target="_blank" rel="noopener noreferrer">
                Launch Bot
              </a>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="card" style={{padding: '24px'}}>
              <div className="section-title">
                <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 12a4 4 0 0 1 4-4h4a4 4 0 1 1 0 8h-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  <path d="M15 12a4 4 0 0 1-4 4H7a4 4 0 1 1 0-8h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
                Quick links
              </div>
              <div className="badges" style={{margin: '6px 0 0'}}>
                <a className="badge" href="https://t.me/syncradebot" target="_blank" rel="noopener noreferrer">
                  Open Telegram Bot
                </a>
                <a className="badge" href="https://t.me/syncrade" target="_blank" rel="noopener noreferrer">
                  Join Syncrade AI Hub
                </a>
                <a className="badge" href="/blog">Visit Blog</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container f-grid">
          <div className="f-col">
            <div className="brand" style={{marginBottom: '8px'}}>
              <div className="logo" aria-hidden="true"></div>
              <strong>Syncrade</strong>
            </div>
            <p style={{margin: '0 0 10px'}}>
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
            <a href="#" aria-disabled="true">Terms</a>
            <a href="#" aria-disabled="true">Privacy</a>
            <a href="#" aria-disabled="true">Cookies</a>
          </div>
        </div>

        <div className="container" style={{marginTop: '18px', color: 'var(--muted)', fontSize: '12.5px'}}>
          <p style={{margin: '0'}}>
            Risk disclaimer: Trading digital assets involves significant risk and can result in the loss of your capital. Nothing here is financial advice. Syncrade does not accept deposits; support is available via Telegram Stars only.
          </p>
          <p style={{margin: '8px 0 0'}}>© <span id="year"></span> Syncrade. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;