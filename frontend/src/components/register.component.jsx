import React , {Component} from "react";
import axios from 'axios';

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
            phone:"",
        }
    }

    onChangeFirstName(e) { this.setState({ firstName: e.target.value });}

    onChangeLastName(e) { this.setState({ lastName: e.target.value });}

    onChangePhone(e) { this.setState({ phone: e.target.value }); }

    onChangeEmail(e) { this.setState({ email: e.target.value }); }

    onChangePassword(e) { this.setState({ password: e.target.value }); }

    onChangeConfirmPassword(e) { this.setState({ confirmPassword: e.target.value }); }

    onSubmit(e) {
        e.preventDefault();

        if(this.state.phone.length !== 10) {
            alert("Phone number must be exactly 10 digits long!");
            return;
        }

        if(this.state.password !== this.state.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const user = {
            lastName: this.state.lastName,
            firstName: this.state.firstName,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
            role: 'user'
        }

        console.log(user);

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data))
            .catch(err => console.error(err));

        window.location = '/login';
    }  
    render() {
        return(
            <div>
                <h3>Gata să devii șef pe grătare?</h3>
                <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                        <label>Last Name: </label>
                        <input 
                            type="text"
                            className="form-control" 
                            value={this.state.lastName} 
                            onChange={this.onChangeLastName}
                            required
                        />
                        </div>

                         <div className="form-group">
                        <label>First Name: </label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={this.state.firstName} 
                            onChange={this.onChangeFirstName}
                            required
                        />
                        </div>

                        <div className="form-group">
                        <label>Phone Number: </label>
                        <input 
                            type="tel"
                            className="form-control" 
                            value={this.state.phone} 
                            onChange={this.onChangePhone}
                            required
                        />
                        </div>

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
                        <label>Confirm Password: </label>
                        <input 
                            type="password"
                            className="form-control" 
                            value={this.state.confirmPassword} 
                            onChange={this.onChangeConfirmPassword}
                            required
                        />
                        </div>

                        <br/>
                        <div className="form-group">
                        <input type="submit" value="Create Account" className="btn btn-primary"/>
                        </div>

                </form>
            </div>
        )
    }
}