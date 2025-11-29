import React, { Component } from "react";
import axios from "axios";

export default class Grills extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grills: [], // Array of grill objects
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/grills/")
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            grills: response.data,
          });
        }
      })
      .catch(err => console.error("Error fetching grills:", err));
  }

  render() {
    return (
      <div style={{ padding: "20px" }}>
        <h3>Grills</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)", // 3 columns for desktop
            gap: "20px", // Space between cards
          }}
        >
          {this.state.grills.map((grill, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "15px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
              }}
            >
              {/* Grill Picture */}
              <p><strong>User:</strong> {grill.User.Nume +" " + grill.User.Prenume|| "Unknown"}</p>
              <img
                src={"http://localhost:5000/uploads/" + grill.Image} // Placeholder if no picture
                alt={grill.Titlu}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <p><strong>Rating:</strong> {grill.Rating + " Mici"}</p>
              {/* Grill Details */}
              <h4>{grill.Titlu}</h4>
              <p><strong>Description:</strong> {grill.Descriere}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}