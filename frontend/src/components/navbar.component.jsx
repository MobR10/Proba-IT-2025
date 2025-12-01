import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: localStorage.getItem("loggedIn") === "true",
      userID: localStorage.getItem("userID") || null,
    };
  }

  handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userID");
    localStorage.removeItem("userRole");
    this.setState({ loggedIn: false, userID: null });
    window.location = "/";
  };

  // Collapse the navbar on mobile
  collapseNavbar = () => {
    const navbar = document.getElementById("navbarResponsive");
    if (navbar.classList.contains("show")) {
      const bsCollapse = bootstrap.Collapse.getInstance(navbar);
      if (bsCollapse) bsCollapse.hide();
    }
  };

  render() {
    const { loggedIn } = this.state;

    return (
      <nav
        className="navbar navbar-expand-md navbar-dark rounded-bottom"
        style={{ backgroundColor: "rgba(99, 1, 1, 1)" }}
      >
        <div className="container-fluid">
          {/* Brand / Home link */}
          <NavLink
            to="/"
            className="navbar-brand"
            onClick={this.collapseNavbar} // <-- fixed
          >
            Pimp Your Grill
          </NavLink>

          {/* Mobile toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Nav links */}
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink
                  to="/grills"
                  className="nav-link"
                  onClick={this.collapseNavbar} // collapse on mobile
                >
                  Best Grills
                </NavLink>
              </li>

              {loggedIn ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/profile"
                      className="nav-link"
                      onClick={this.collapseNavbar} // collapse on mobile
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <span
                      className="nav-link"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.handleLogout();
                        this.collapseNavbar();
                      }}
                    >
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      className="nav-link"
                      onClick={this.collapseNavbar} // collapse on mobile
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/register"
                      className="nav-link"
                      onClick={this.collapseNavbar} // collapse on mobile
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
