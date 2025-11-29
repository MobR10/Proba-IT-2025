import React , {Component} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
       
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: "",
            password: "",
        }
    }

    onChangeEmail(e) { this.setState({ email: e.target.value }); }

    onChangePassword(e) { this.setState({ password: e.target.value }); }


    onSubmit(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password,
        };

        console.log("USER INPUT" + JSON.stringify(user));

        axios.get('http://localhost:5000/users/findByEmail', { params: { email: this.state.email } })
        .then(res => {
        let ok = true;
        
        if (res.data) {
        console.log('User found:', res.data);

        // Check if the password matches
        if (res.data.Parola === this.state.password) {
        } else {
            ok = false;
        }
        }
        else{
            ok = false;
        }
        if (ok) {
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("userID", res.data._id); // Save the user ID in localStorage
            console.log(localStorage.getItem("userID"));
            window.location = "/profile"; // Redirect to the profile page
        }
        else{
            alert('Invalid email or password');
        }
    })
    .catch(err => {
        console.error(err);
        alert('An error occurred');
    });

    }

    render() {
        return(
            <div>
                <h3>Bine ai revenit mare grătaragiu</h3>
                <form onSubmit={this.onSubmit}>
                    
                        <div className="form-group">
                        <label>Email: </label>
                        <input 
                            type="email"
                            className="form-control" 
                            value={this.state.email} 
                            onChange={this.onChangeEmail}
                            required
                        />
                        </div>

                        <div className="form-group">
                        <label>Password: </label>
                        <input 
                            type="password"
                            className="form-control" 
                            value={this.state.password} 
                            onChange={this.onChangePassword}
                            required
                        />
                        </div>
                        
                        <div className="form-group">
                        <input type="submit" value="Log In" className="btn btn-primary"/>
                        </div>
                    
                        <br/>
                        <div className="form-group">
                        <p>
                            No account? Press here to{" "}
                            <Link to="/register">sign up</Link>.
                        </p>
                        </div>
                </form>
            </div>
        )
    }
}