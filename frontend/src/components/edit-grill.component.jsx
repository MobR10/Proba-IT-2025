import React, { Component } from "react";
import axios from "axios";

export default class EditGrill extends Component {
  constructor(props) {
    super(props);

    this.state = {
        defaultGrillData: {},    
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

  componentDidMount() {
    if (this.props.grillID) {
      this.fetchGrillData(this.props.grillID);
    }
  }

  fetchGrillData = (grillID) => {
    axios
      .get(`http://localhost:5000/grills/findById/${grillID}`)
      .then((res) => {
        this.setState({
          defaultGrillData: res.data,
          Titlu: res.data.Titlu,
          Descriere: res.data.Descriere,
          Rating: res.data.Rating,
          User: res.data.User,
          Image: null, // Keep null for new uploads
        });
      })
      .catch((err) => console.error(err));
  };

  onChangeTitlu(e) { this.setState({ Titlu: e.target.value ? e.target.value : this.state.defaultGrillData.Titlu }); }
  onChangeDescriere(e) { this.setState({ Descriere: e.target.value ? e.target.value : this.state.defaultGrillData.Descriere }); }
  onChangeImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = 512 * 1024;
    if (file.size > maxSize) {
      e.target.value = null;
      alert("Image is too large! Maximum allowed size is 512KB.");
      return;
    }
    this.setState({ Image: file });
  }

  onSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Titlu", this.state.Titlu);
    formData.append("Descriere", this.state.Descriere);
    formData.append("User", this.state.User);
    formData.append("Rating", this.state.Rating);
    if (this.state.Image) formData.append("Image", this.state.Image);

    const url =`http://localhost:5000/grills/edit/${this.props.grillID}`


    axios
      .post(url, formData)
      .then((res) => {
        alert(res.data);
        this.props.closeModal();
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title: </label>
            <input type="text" className="form-control" value={this.state.Titlu} onChange={this.onChangeTitlu} />
          </div>
          <div className="form-group mt-3">
            <label>Description: </label>
            <textarea className="form-control" value={this.state.Descriere} onChange={this.onChangeDescriere} />
          </div>
          <div className="form-group mt-3">
            <label>Image: </label>
            <input type="file" className="form-control" onChange={this.onChangeImage} />
          </div>
          <div className="form-group mt-3">
            <input type="submit" value="Update Grill" className="btn btn-primary" style={{ backgroundColor: "rgba(29, 177, 41, 0.7)", borderColor: "rgba(0, 0, 0, 1)" , fontWeight: "bold"}}/>
          </div>
        </form>
      </div>
    );
  }
}
