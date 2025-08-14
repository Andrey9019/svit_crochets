import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#F5E6E8" }}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold text-dark" to="/">
          🧶 SvBag
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/")}`} to="/">
                Головна
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/catalog")}`}
                to="/catalog"
              >
                Каталог
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/contacts")}`}
                to="/contacts"
              >
                Контакти
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
