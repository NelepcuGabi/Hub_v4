import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../components/Navbarstyle.css';

function Navbar() {
  const [active, setActive] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const accessToken = getCookie('ACCESS_TOKEN');
    if (accessToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    document.cookie = "ACCESS_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsAuthenticated(false);
    navigate('/login');
    window.location.reload();
  };

  const navToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="nav">
      <a href="/Home" className="nav__brand">
        CodeNetHub
      </a>
      <div className="nav__toggler" onClick={navToggle} aria-label="Toggle navigation">
        <div className={`line ${menuOpen ? 'open' : ''}`}></div>
        <div className={`line ${menuOpen ? 'open' : ''}`}></div>
        <div className={`line ${menuOpen ? 'open' : ''}`}></div>
      </div>
      <ul className={`nav__menu ${menuOpen ? "open" : ""}`}>
        <li className="nav__item">
          <Link to="/" className="nav__link" onClick={navToggle}>
            Acasa
          </Link>
        </li>
        {isAuthenticated ? (
          <>
            <li className="nav__item">
              <Link to="/about" className="nav__link" onClick={navToggle}>
                Despre
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/contact" className="nav__link" onClick={navToggle}>
                Contact
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/" onClick={handleLogout} className="nav__link">
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="nav__item">
              <Link to="/login" className="nav__link" onClick={navToggle}>
                Login
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/register" className="nav__link" onClick={navToggle}>
                Înregistrare
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/about" className="nav__link" onClick={navToggle}>
                Despre
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/contact" className="nav__link" onClick={navToggle}>
                Contact
              </Link>
            </li>
          </>
        )}
        <li className="nav__item">
          <Link to="/proiecte" className="nav__link" onClick={navToggle}>
            Proiecte
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

function getCookie(name) {
  let cookieArr = document.cookie.split(";");
  for (let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");
    if (name === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}
