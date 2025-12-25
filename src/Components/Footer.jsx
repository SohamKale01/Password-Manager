import "./Footer.css";

const Footer = ({ isFixed }) => {
  return (
    <footer className={`footer ${isFixed ? "fixed" : "relative"}`}>
      <div className="footer-content">
        <h3>🛡️ PassWord</h3>
        <p className="footer-bottom">
          © {new Date().getFullYear()} PassWord Manager. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
