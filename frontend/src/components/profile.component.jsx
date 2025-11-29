import React, { Component } from "react";
import axios from "axios";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grills: [],
      user: {},
      userID: localStorage.getItem("userID"),
      showModal: false,
      newGrill: {
        Titlu: "",
        Descriere: "",
        Rating: 0,
        Image: "",
      },
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/users/findById/${this.state.userID}`)
      .then((response) => {
        this.setState({ user: response.data });
      })
      .catch((err) => console.error("Error fetching user information:", err));

    axios
      .get(`http://localhost:5000/grills/getUserGrills/${this.state.userID}`)
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({ grills: response.data });
        }
      })
      .catch((err) => console.error("Error fetching user grills:", err));
  }

  render() {
    const { user, grills } = this.state;

    return (
      <div className="container py-4">
        <h3 className="mb-4">User Profile</h3>

        {/* Row: User info + Create button */}
        <div className="row mb-4">

          {/* User Information */}
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="card-title">User Information</h4>
                <p><strong>Last Name:</strong> {user.Nume || "N/A"}</p>
                <p><strong>First Name:</strong> {user.Prenume || "N/A"}</p>
                <p><strong>Email:</strong> {user.Email || "N/A"}</p>
                <p><strong>Phone:</strong> {user.Telefon || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Create Grill Button */}
          <div className="col-md-6 d-flex justify-content-end align-items-start">
            <button
              onClick={this.toggleModal}
              className="btn btn-primary btn-lg"
            >
              Create Grill
            </button>
          </div>
        </div>

        {/* User Grills */}
        <h3 className="mb-3">Grills</h3>
        
        <div className="row g-4">
          {grills.map((grill, index) => ( 
            <div key={index} className="col-md-4">
              <div className="card shadow-sm h-100 text-center">

                <img
                {...console.log(grill.Image)}
                  src={`http://localhost:5000/uploads/${grill.Image}`}
                  alt={`Imagine pentru ${grill.Titlu}`}
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                />

                <div className="card-body">
                  <h4 className="card-title">{grill.Titlu}</h4>
                  <p><strong>Rating:</strong> {grill.Rating} Mici</p>
                  <p><strong>Description:</strong> {grill.Descriere}</p>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    );
  }
}
