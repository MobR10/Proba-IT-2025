import React, { Component } from "react";
import axios from "axios";

export default class CreateGrill extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Titlu: "",
      Descriere: "",
      User: localStorage.getItem("userID"),
      Rating: 0,
      Image: null,
    };

    this.onChangeTitlu = this.onChangeTitlu.bind(this);
    this.onChangeDescriere = this.onChangeDescriere.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeTitlu(e) { this.setState({ Titlu: e.target.value }); }
  onChangeDescriere(e) { this.setState({ Descriere: e.target.value }); }
  onChangeImage(e) { this.setState({ Image: e.target.files[0] }); }

  onSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Titlu", this.state.Titlu);
    formData.append("Descriere", this.state.Descriere);
    formData.append("User", this.state.User);
    formData.append("Rating", this.state.Rating);
    formData.append("Image", this.state.Image);

    axios.post("http://localhost:5000/grills/add", formData)
      .then(res => console.log(res.data))
      .catch(err => console.error(err));

      window.location = '/profile';
  }

  render() {
    return (
      <div>
        <h3>Create New Grill</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title: </label>
            <input type="text" required className="form-control" value={this.state.Titlu} onChange={this.onChangeTitlu} />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <textarea required className="form-control" value={this.state.Descriere} onChange={this.onChangeDescriere} />
          </div>
          <div className="form-group">
            <label>Image: </label>
            <input type="file" className="form-control" onChange={this.onChangeImage} />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Grill" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}