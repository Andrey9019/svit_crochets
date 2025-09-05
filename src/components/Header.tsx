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
      style={{ backgroundColor: "#E6B3B3" }}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold text-white" to="/">
          🧶 Svit Crochets
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse text-white" id="navbarNav">
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
                to="https://www.instagram.com/svit_crochets?igsh=MWo5bmxkN2czb2lueA=="
              >
                Instagram
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
