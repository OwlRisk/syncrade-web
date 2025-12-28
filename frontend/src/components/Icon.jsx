const icons = {
  'paper-plane': (
    <path d="M21.8 3.2L2.7 10.5c-.9.35-.88 1.68.03 2l5.1 1.8 1.9 5.3c.32.88 1.53.92 1.97.06l2.9-5.46 5.2-9.79c.44-.83-.37-1.77-1.3-1.31Z" stroke="#0a0b10" strokeWidth="1.6" fill="white" />
  ),
  'shield-check': (
    <>
      <path d="M12 3l7 3v5a9 9 0 0 1-7 8 9 9 0 0 1-7-8V6l7-3Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  'star': (
    <path d="M12 3.5l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.9 6.4 20.7l1.1-6.2L3 10.1l6.2-.9L12 3.5Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
  ),
  'radar': (
    <>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 12l6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </>
  ),
  'people': (
    <>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 18a5.5 5.5 0 0 1 11 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="17" cy="10" r="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14.5 18.5a4.5 4.5 0 0 1 7 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  'book': (
    <>
      <path d="M5 5.5a3 3 0 0 1 3-3h11v18H8a3 3 0 0 0-3 3V5.5Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 2.5v18" stroke="currentColor" strokeWidth="1.6" />
    </>
  ),
  'signal-waves': (
    <path d="M2 12h3M19 12h3M6 12c2-4 10-4 12 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  ),
  'graduation-cap': (
    <>
      <path d="M3 9l9-4 9 4-9 4-9-4Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 11v5c3 2 7 2 10 0v-5" stroke="currentColor" strokeWidth="1.6" />
    </>
  ),
  'eye': (
    <>
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
    </>
  ),
  'stars': (
    <path d="M12 3.3l2.4 4.9 5.4.8-3.9 3.8.9 5.3L12 15.9 7.2 18.1l.9-5.3-3.9-3.8 5.4-.8L12 3.3Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
  ),
  'bot': (
    <>
      <rect x="4" y="5" width="16" height="14" rx="3" stroke="white" strokeWidth="1.6" opacity="0.9" />
      <circle cx="9" cy="12" r="1.6" fill="white" />
      <circle cx="15" cy="12" r="1.6" fill="white" />
    </>
  ),
  'bolt': (
    <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  ),
  'activity': (
    <path d="M3 13h4l2-7 4 16 2-9h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  ),
  'gauge': (
    <>
      <path d="M4 14a8 8 0 1 1 16 0" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 14l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  'bell': (
    <>
      <path d="M18 10a6 6 0 1 0-12 0c0 4-2 5-2 5h16s-2-1-2-5Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 20a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" />
    </>
  ),
  'clock': (
    <>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7v5l4 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  'shield-check-2': (
    <>
      <path d="M12 4l6 2.5V12a7.5 7.5 0 0 1-6 7.3A7.5 7.5 0 0 1 6 12V6.5L12 4Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9.5 12.5l1.7 1.7 3.3-3.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  'layers': (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 13l9 5 9-5" stroke="currentColor" strokeWidth="1.6" opacity=".8" />
    </>
  ),
  'check': (
    <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  ),
  'shield': (
    <path d="M12 3l7 3v5a9 9 0 0 1-7 8 9 9 0 0 1-7-8V6l7-3Z" stroke="currentColor" strokeWidth="1.6" />
  ),
  'plus': (
    <path d="M3 12h18M12 3v18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  ),
  'ai-native': (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  'link': (
    <>
      <path d="M9 12a4 4 0 0 1 4-4h4a4 4 0 1 1 0 8h-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M15 12a4 4 0 0 1-4 4H7a4 4 0 1 1 0-8h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  )
};

const Icon = ({ name, className, ...props }) => {
  const SvgComponent = icons[name];
  if (!SvgComponent) {
    return null; // Or a default icon
  }
  return (
    <svg className={className || 'icon'} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      {SvgComponent}
    </svg>
  );
};

export default Icon;
