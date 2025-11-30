import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import img1 from "../assets/Group 110.png";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    };
  }

  onChangeFirstName(e) {
    this.setState({ firstName: e.target.value });
  }

  onChangeLastName(e) {
    this.setState({ lastName: e.target.value });
  }

  onChangePhone(e) {
    this.setState({ phone: e.target.value });
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onChangeConfirmPassword(e) {
    this.setState({ confirmPassword: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.state.phone.length !== 10) {
      alert("Phone number must be exactly 10 digits long!");
      return;
    }

    if (this.state.password !== this.state.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const user = {
      lastName: this.state.lastName,
      firstName: this.state.firstName,
      email: this.state.email,
      password: this.state.password,
      phone: this.state.phone,
      role: "user",
    };

    console.log(user);

    axios
      .post(`${import.meta.env.VITE_API_URL}/users/add`, user)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));

    window.location = "/login";
  }
  render() {
    return (
      <div className="container py-5">
        <form
          onSubmit={this.onSubmit}
          className="text-white p-5 rounded mx-auto mt-5"
          style={{
            maxWidth: "500px",
            backgroundColor: "rgba(99, 1, 1, 1)", // red background
          }}
        >
          <h3 className="text-center fw-bold mb-4">
            Gata să devii șef pe grătare?
          </h3>

          <div className="mb-3">
            <label className="form-label fw-bold">Last Name:</label>
            <input
              type="text"
              className="form-control form-control-lg"
              value={this.state.lastName}
              onChange={this.onChangeLastName}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">First Name:</label>
            <input
              type="text"
              className="form-control form-control-lg"
              value={this.state.firstName}
              onChange={this.onChangeFirstName}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Phone Number:</label>
            <input
              type="tel"
              className="form-control form-control-lg"
              value={this.state.phone}
              onChange={this.onChangePhone}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Email:</label>
            <input
              type="email"
              className="form-control form-control-lg"
              value={this.state.email}
              onChange={this.onChangeEmail}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Password:</label>
            <input
              type="password"
              className="form-control form-control-lg"
              value={this.state.password}
              onChange={this.onChangePassword}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">Confirm Password:</label>
            <input
              type="password"
              className="form-control form-control-lg"
              value={this.state.confirmPassword}
              onChange={this.onChangeConfirmPassword}
              required
            />
          </div>

          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-success btn-lg">
              Create Account
            </button>
          </div>

          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-success">
              Log in
            </Link>
            .
          </p>
        </form>
      </div>
    );
  }
}
