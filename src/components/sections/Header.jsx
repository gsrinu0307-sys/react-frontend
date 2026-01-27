import React from 'react';

function Header() {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}> APPLICATION & ONBOARDING FORM </h1>
      <hr style={styles.divider} />
    </header>
  );
}

const styles = {
  header: {
    padding: '20px 0',
    textAlign: 'center',
    backgroundColor: '#ffffff', // simple white background
  },
  title: {
    color: '#333333', // dark text for clarity
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    fontSize: '24px',
    fontWeight: '500',
    margin: 0,
  },
  divider: {
    width: '50%',
    margin: '10px auto 0',
    border: 'none',
    height: '2px',
    backgroundColor: '#1a73e8', // subtle blue line
    borderRadius: '1px',
  },
};

export default Header;
