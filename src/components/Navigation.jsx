import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { ActiveLinkContext } from "../context/Context";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfileDropDown from "./ProfileDropdown";

const Navigation = () => {
  const { active, setActive } = useContext(ActiveLinkContext);
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const current = location.pathname.replace("/", "") || "dashboard";
    setActive(current);
  }, [location.pathname, setActive]);

  const navItems = ["dashboard", "exercise", "workout-plan"];

  return (
    <Navbar expand="md" className="navbar-root">
      <Container
        fluid
        className="px-0 d-flex align-items-center justify-content-between"
      >
        {/* ===== MOBILE HEADER ===== */}
        <div className="mobile-header d-md-none w-100 d-flex align-items-center justify-content-between">
          {/* Hamburger */}
          <button
            className="icon-btn"
            onClick={() => setExpanded(!expanded)}
            aria-label="Toggle navigation"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>

          {/* Brand */}
          <div className="brand-text">Fitness Buddy</div>

          {/* Profile Dropdown */}
          <ProfileDropDown />
        </div>

        {/* Mobile Nav Links */}
        {expanded && (
          <Nav className="d-md-none flex-column px-3 mt-2">
            {navItems.map((item) => (
              <Nav.Link
                as={Link}
                key={item}
                to={`/${item}`}
                onClick={() => setExpanded(false)}
                className={`nav-item-link ${active === item ? "active" : ""}`}
              >
                {item}
              </Nav.Link>
            ))}
          </Nav>
        )}

        {/* ===== DESKTOP HEADER ===== */}
        <div className="d-none d-md-flex align-items-center w-100 justify-content-between">
          {/* Left: Brand + NavLinks */}
          <div className="d-flex align-items-center">
            <div className="brand-desktop me-4">Fitness Buddy</div>
            <Nav className="d-flex">
              {navItems.map((item) => (
                <Nav.Link
                  as={Link}
                  key={item}
                  to={`/${item}`}
                  onClick={() => setActive(item)}
                  className={`nav-item-link ${active === item ? "active" : ""}`}
                >
                  {item}
                </Nav.Link>
              ))}
            </Nav>
          </div>

          {/* Right: Profile Dropdown */}
          <ProfileDropDown />
        </div>
      </Container>
    </Navbar>
  );
};

export default Navigation;
