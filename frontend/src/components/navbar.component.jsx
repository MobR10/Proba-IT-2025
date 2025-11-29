import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: localStorage.getItem("loggedIn") === "true", // Check login state from localStorage
      userID: localStorage.getItem("userID") || null, // Get userID from localStorage
    };

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    // Clear login state and localStorage
    
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userID");

    this.setState({ loggedIn: false });
    this.setState({ userID: null });
    window.location = "/"; // Redirect to home page after logout
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          Pimp Your Grill
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/grills" className="nav-link">
                Best Grills
              </Link>
            </li>
            {this.state.loggedIn ? (
              <>
                {/* Show Profile and Logout when logged in */}
                <li className="navbar-item">
                  <Link to="/profile" className="nav-link">
                    Profile
                  </Link>
                </li>
                <li className="navbar-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={this.handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                {/* Show Login and Register when logged out */}
                <li className="navbar-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}