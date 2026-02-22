// Shared glassmorphism styles - update here to apply everywhere

export const glassStyle = {
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
};

export const glassCardStyle = {
    background: 'rgba(255, 255, 255, 0.70)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.6)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
    borderRadius: '1rem',
    padding: '2.5rem',
};

export const techPillStyle = {
    background: 'transparent',
    color: '#1c1c1c',
    border: '1px solid rgba(28, 28, 28, 0.2)',
    borderRadius: '0.5rem',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
};

export const liveBadgeStyle = {
    background: 'rgba(217, 70, 118, 0.15)',
    color: '#d94676',
    borderRadius: '9999px',
    padding: '0.25rem 0.75rem',
    fontSize: '0.75rem',
    fontWeight: 500,
};

export const visitButtonStyle = {
    background: '#5c5046',
    color: '#ffffff',
    borderRadius: '0.75rem',
    padding: '0.75rem 1.5rem',
    fontWeight: 600,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'transform 0.2s',
};

// CSS snippet for copying
export const getCssSnippet = () => `background: rgba(255, 255, 255, 0.58);
backdrop-filter: blur(0px);
-webkit-backdrop-filter: blur(0px);
border: 1px solid rgba(255, 255, 255, 0.4);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);`;
