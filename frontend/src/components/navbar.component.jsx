import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: localStorage.getItem("loggedIn") === "true",
      userID: localStorage.getItem("userID") || null,
    };

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userID");
    this.setState({ loggedIn: false, userID: null });
    window.location = "/";
  }

  collapseNavbar = () => {
    const navbar = document.getElementById("navbarResponsive");
    if (navbar.classList.contains("show")) {
      const bsCollapse = new window.bootstrap.Collapse(navbar, { toggle: false });
      bsCollapse.hide();
    }
  };

  render() {
    const { loggedIn } = this.state;

    return (
      <nav className="navbar navbar-expand-md navbar-dark  rounded-bottom fixed-top" style={{backgroundColor: "rgba(99, 1, 1, 1)"}}>
        <div className="container-fluid" >
          <Link to="/" className="navbar-brand" onClick={this.collapseNavbar}>
            Pimp Your Grill
          </Link>

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

          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/grills" className="nav-link" onClick={this.collapseNavbar}>
                  Best Grills
                </Link>
              </li>

              {loggedIn ? (
                <>
                  <li className="nav-item">
                    <Link to="/profile" className="nav-link" onClick={this.collapseNavbar}>
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-link nav-link"
                      onClick={() => { this.handleLogout(); this.collapseNavbar(); }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link" onClick={this.collapseNavbar}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link" onClick={this.collapseNavbar}>
                      Register
                    </Link>
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
