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
  onChangeImage = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes

    if (file.size > maxSize) {
        e.target.value = null; // Clear the input
        confirm("salut");
        alert("Image is too large! Maximum allowed size is 5MB.");
        return;
    }
    this.setState({ Image: file });
};

  onSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Titlu", this.state.Titlu);
    formData.append("Descriere", this.state.Descriere);
    formData.append("User", this.state.User);
    formData.append("Rating", this.state.Rating);
    formData.append("Image", this.state.Image);

    axios.post(`${import.meta.env.VITE_API_URL}/grills/add`, formData)
      .then(res => console.log(res.data))
      .catch(err => console.error(err));

      alert("Grill Posted!");
      this.props.closeModal();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label>Title: </label>
            <input type="text" required className="form-control" value={this.state.Titlu} onChange={this.onChangeTitlu} />
          </div>
          <div className="form-group mt-3">
            <label>Description: </label>
            <textarea required className="form-control" value={this.state.Descriere} onChange={this.onChangeDescriere} />
          </div>
          <div className="form-group mt-3">
            <label>Image: </label>
            <input type="file" required className="form-control" onChange={this.onChangeImage} onClick={(e) => e.stopPropagation()}  />
          </div>
          <div className="form-group mt-3">
            <input type="submit" value="Post Grill" className="btn btn-primary" style={{ backgroundColor: "rgba(29, 177, 41, 0.7)", borderColor: "rgba(0, 0, 0, 1)" , fontWeight: "bold"}} />
          </div>
        </form>
      </div>
    );
  }
}