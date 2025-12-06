import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


export default class ForgotPassword extends Component {

    constructor(props) {
        super(props);


        this.state = {
            email: "",
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeEmail(e){
        this.setState({email: e.target.value});
    }
  
    onSubmit(e) {
    e.preventDefault();

    axios.get(`${import.meta.env.VITE_API_URL}/users/findByEmail`, {
        params: { email: this.state.email }
    })
    .then(res => {
        // res.data is the found user
        if(res.data.found == false){
          // console.log("User not found")
          // do nothing, just show the generic message below
        }
        if(res.data.found == true)
          axios.post(`${import.meta.env.VITE_API_URL}/users/createPassToken`, {email: this.state.email})
          .then(res => {
          // building the body to send to the backend route for sending the reset link email
          const body = {
            email: this.state.email,
            token: res.data.token,
          }
          axios.post(`${import.meta.env.VITE_API_URL}/users/sendResetEmail`, body)
          .then(res =>{
            // console.log(res.data);
            // do nothing, just show the generic message below
          })
          .catch(err => {
            // console.error('Error sending reset email:', err.response?.data || err.message);
          });
          })
          .catch(err => {
              // console.error('Error creating password reset token:', err.response?.data || err.message);
          });
          alert('Dacă email-ul este înregistrat, vei primi un email.');
        })
    .catch(err => {
        if (err.response?.status === 500) {
        // still show generic message to avoid enumeration
        alert('Dacă email-ul este înregistrat, vei primi un email.');
        } else {
        alert('Ceva nu a mers bine. Încearcă mai târziu.');
        }
  });
}
  
    render() {
        return (
          <div className="container">
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
    
      <div className="d-grid mb-4">
        <button
          type="submit"
          className="btn btn-success btn-lg"
        >
          Send Reset Link
        </button>
      </div>

    </form>
    
          </div>
        );
      }

}