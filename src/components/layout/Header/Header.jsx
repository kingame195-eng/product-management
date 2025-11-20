import react from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-left"></div>
          <Link to="/" className="logo">
            <span className="logo-icon">🏪</span>
            <span className="logo-text">Product Management</span>
          </Link>
        </div>

        <nav className="header-nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/products" className="nav-link">
            Products
          </Link>
          <Link to="/add-product" className="nav-link">
            Add new
          </Link>
        </nav>

        <div className="header-right">
          <div className="user-info">
            <span className="user-icon">👤</span>
            <span className="user-name">John Doe</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
