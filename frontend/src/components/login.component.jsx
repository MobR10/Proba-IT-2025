import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import img1 from "../assets/Group 110.png";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      password: "",
    };
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    console.log("USER INPUT", user);

    // Send login request to backend
    axios
      .post(`${import.meta.env.VITE_API_URL}/users/login`, user)
      .then((res) => {
        // Backend should return user info if login is successful
        if (res.data && res.data.user) {
          localStorage.setItem("loggedIn", "true");
          localStorage.setItem("userID", res.data.user._id);
          localStorage.setItem("userRole", res.data.user.Rol);
          window.location = "/"; // Redirect
        } else {
          alert("Invalid email or password");
        }
      })
      .catch((err) => {
        console.error(err.response?.data || err.message);
        alert("Invalid email or password");
      });
  }

  render() {
    return (
      <div className="container py-5">
        <form
  onSubmit={this.onSubmit}
  className="text-white p-5 rounded mx-auto mt-5"
  style={{ 
    maxWidth: "500px", // wider form
    backgroundColor: "rgba(99, 1, 1, 1)" // red background
  }}
>
  <h3 className="text-center fw-bold mb-4">Bine ai revenit mare grătaragiu</h3>

  <div className="mb-4">
    <label className="form-label fw-bold">Email:</label>
    <input
      type="email"
      className="form-control form-control-lg"
      value={this.state.email}
      onChange={this.onChangeEmail}
      required
    />
  </div>

  <div className="mb-4">
    <label className="form-label fw-bold">Password:</label>
    <input
      type="password"
      className="form-control form-control-lg"
      value={this.state.password}
      onChange={this.onChangePassword}
      required
    />
  </div>

  <div className="d-grid mb-4">
    <button
      type="submit"
      className="btn btn-success btn-lg"
    >
      Log In
    </button>
  </div>

  <p className="text-center">
    No account? Press here to{" "}
    <Link to="/register" className="text-success">
      sign up
    </Link>.
  </p>
</form>

      </div>
    );
  }
}
