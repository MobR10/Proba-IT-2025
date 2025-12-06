import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      password: "",
      confirmPassword: "",
      token: this.props.token, // Extract the token from route params
    };

    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users/verifyPassToken/${this.state.token}`)
      .then((response) => {
        if (response.data.status === "ok") {
          this.setState({ validated: true });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onChangeConfirmPassword(e) {
    this.setState({ confirmPassword: e.target.value });
  }

  async onSubmit(e) {
  e.preventDefault();

  try {
    // Verify the token
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/verifyPassToken/${this.state.token}`);
    if (response.data.status === "invalid") {
      alert("Token invalid sau expirat");
      window.location = '/forgotPassword';
      return; // Exit the onSubmit method
    }
  } catch (error) {
    console.error(error);
    alert("Error verifying token. Please try again.");
    return; // Exit the onSubmit method
  }

  // Check if passwords match
  if (this.state.password !== this.state.confirmPassword) {
    alert("Parolele nu coincid!");
    return; // Exit the onSubmit method
  }

  // Send the password reset request
  const body = {
    password: this.state.password,
    token: this.state.token,
  };

  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/users/resetPassword`, body);
    if (res.data.status === 'ok') {
      alert("Parola a fost schimbată cu succes!");
      window.location = "/login"; // Redirect to login
    } else {
      alert('Ceva nu a mers bine. Încearcă din nou.');
      window.location = '/forgotPassword';
    }
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("Error resetting password. Please try again.");
  }
}

  render() {
    if (!this.state.validated) {
      return (
        <div className="container">
          <div className="">
            <div
              className="text-white p-5 rounded mx-auto mt-5"
              style={{ maxWidth: "500px", backgroundColor: "rgba(99, 1, 1, 1)" }}
            >
              <div className="">
                <div className="text-center fw-bold mb-4">Invalid or Expired Token</div>
                <div className="d-grid mb-4">
                  <Link to="/forgotPassword" className="btn btn-warning btn-lg">
                    Request New Password Reset
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="container ">
        <form
          onSubmit={this.onSubmit}
          className="text-white p-5 rounded mx-auto mt-5"
          style={{
            maxWidth: "500px", // wider form
            backgroundColor: "rgba(99, 1, 1, 1)", // red background
          }}
        >
          <h3 className="text-center fw-bold mb-4">Schimbă-ți parola</h3>

          <div className="mb-4">
            <label className="form-label fw-bold">New Password:</label>
            <input
              type="password"
              className="form-control form-control-lg"
              value={this.state.password}
              onChange={this.onChangePassword}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">Confirm New Password:</label>
            <input
              type="password"
              className="form-control form-control-lg"
              value={this.state.confirmPassword}
              onChange={this.onChangeConfirmPassword}
              required
            />
          </div>

          <div className="d-grid mb-4">
            <button type="submit" className="btn btn-success btn-lg">
                    Reset your password
            </button>
          </div>
        </form>
      </div>
    );
  }
}