import React, { useState } from 'react';
import './Navebar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Area */}
        <div className="navbar-logo">
          <span className="logo-icon">🛡️</span>
          <span className="logo-text">PassWord</span>
        </div>

        {/* Desktop Menu */}
        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <a href="#vault" className="nav-links" onClick={toggleMenu}>My Vault</a>
          </li>
          <li className="nav-item">
            <a href="#generator" className="nav-links" onClick={toggleMenu}>Generator</a>
          </li>
          <li className="nav-item">
            <a href="#audit" className="nav-links" onClick={toggleMenu}>Security Audit</a>
          </li>
          <li className="nav-item mobile-only">
            <a href="#settings" className="nav-links" onClick={toggleMenu}>Settings</a>
          </li>
        </ul>

        {/* Action Buttons */}
        <div className="navbar-actions">
          <div className="user-profile">JD</div>
          
          {/* Hamburger Menu (Mobile Only) */}
          <button className="hamburger" onClick={toggleMenu}>
            <span className={`bar ${isMobileMenuOpen ? 'top' : ''}`}></span>
            <span className={`bar ${isMobileMenuOpen ? 'middle' : ''}`}></span>
            <span className={`bar ${isMobileMenuOpen ? 'bottom' : ''}`}></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;