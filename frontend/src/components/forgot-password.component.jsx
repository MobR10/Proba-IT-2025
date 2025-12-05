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
        if(res.data != null)
        axios.get(`${import.meta.env.VITE_API_URL}/users/createPassToken`).then
        (res => {
            // console.log(res.data);
            // Build a reset link to your frontend reset page
        
        
        axios.get(`${import.meta.env.VITE_API_URL}/users/sendResetEmail`, {
            params: { email: this.state.email, token: res.data.token }
        })
        
        }).catch(err => {
            console.error('Error creating password reset token:', err.response?.data || err.message);
        });
        alert('If that email is registered, you will receive reset instructions.');
    })
    .catch(err => {
        if (err.response?.status === 404) {
        // still show generic message to avoid enumeration
        alert('If that email is registered, you will receive reset instructions.');
        } else {
        alert('Something went wrong. Try again later.');
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