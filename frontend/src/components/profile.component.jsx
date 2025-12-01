import React, { Component } from "react";
import axios from "axios";
import CreateGrill from "./create-grill.component";
import EditGrill from "./edit-grill.component";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grills: [],
      user: {},
      userID: localStorage.getItem("userID"),
      showModal: false,
      selectedGrill: null,
      editMode: false,
      mobileIndex: 0, // For mobile slider
    };
  }

  componentDidMount() {
    this.fetchUser();
    this.fetchGrills();
  }

  fetchUser = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users/findById/${this.state.userID}`)
      .then((res) => this.setState({ user: res.data }))
      .catch((err) => console.error(err));
  };

  fetchGrills = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/grills/getUserGrills/${this.state.userID}`)
      .then((res) => this.setState({ grills: res.data }))
      .catch((err) => console.error(err));
  };

  openGrillModal = (grill = null, editMode = false) => {
    this.setState({ showModal: true, selectedGrill: grill, editMode });
  };

  closeModal = () => {
    this.setState({ showModal: false, selectedGrill: null, editMode: false });
  };

  deleteGrill = (grillID) => {
    if (!window.confirm("Are you sure you want to delete this grill?")) return;
    axios
      .delete(`${import.meta.env.VITE_API_URL}/grills/delete/${grillID}`)
      .then(() => {
        this.fetchGrills();
        this.closeModal();
      })
      .catch((err) => console.error(err));
  };

  truncateText(text, maxLength) {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }

  prevMobile = () => {
    const { grills, mobileIndex } = this.state;
    if (grills.length === 0) return;
    const newIndex = (mobileIndex - 2 + grills.length) % grills.length;
    this.setState({ mobileIndex: newIndex });
  };

  nextMobile = () => {
    const { grills, mobileIndex } = this.state;
    if (grills.length === 0) return;
    const newIndex = (mobileIndex + 2) % grills.length;
    this.setState({ mobileIndex: newIndex });
  };

  render() {
    const { grills, user, showModal, selectedGrill, editMode, mobileIndex } =
      this.state;

    // Slice 2 grills per mobile slide
    const mobileGrills = grills.slice(mobileIndex, mobileIndex + 2);

    return (
      <div className="container mt-3 mb-3">
        {/* User Info + Button */}
        <div className="row mb-4 align-items-center">
          <div className="col-12 col-md-6">
            <div
              className="card shadow-sm"
              style={{ backgroundColor: "rgba(99, 1, 1, 1)" }}
            >
              <div className="card-body">
                <p style={{ color: "white" }}>
                  <strong>Last Name:</strong> {user.Nume || "N/A"}
                </p>
                <p style={{ color: "white" }}>
                  <strong>First Name:</strong> {user.Prenume || "N/A"}
                </p>
                <p style={{ color: "white" }}>
                  <strong>Email:</strong> {user.Email || "N/A"}
                </p>
                <p style={{ color: "white" }}>
                  <strong>Phone:</strong> {user.Telefon || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 d-flex justify-content-md-end justify-content-center mt-3 mt-md-0">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => this.openGrillModal(null, true)}
              style={{
                backgroundColor: "rgba(29, 177, 41, 0.7)",
                borderColor: "rgba(0, 0, 0, 1)",
                fontWeight: "bold",
              }}
            >
              Post Grill
            </button>
          </div>
        </div>

        {/* Desktop / Tablet */}
        <div
          className="row g-3 d-none d-md-flex"
          style={{
            backgroundColor: "rgba(99, 1, 1, 1)",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <h2 className="mb-4 text-white text-center">My Grills</h2>
          {grills.map((grill) => (
            <div key={grill._id} className="col-12 col-md-6 col-lg-4">
              <div
                className="card shadow-sm h-100 text-center"
                style={{ cursor: "pointer" }}
                onClick={() => this.openGrillModal(grill, false)}
              >
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/${grill.Image}`}
                  alt={grill.Titlu}
                  className="card-img-top"
                  style={{ width: "100%", height: "180px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h4 className="card-title">
                    {this.truncateText(grill.Titlu, 20)}
                  </h4>
                  <p>
                    <strong>Rating:</strong> {grill.Rating} Mici
                  </p>
                  <p>
                    <strong>Description:</strong>{" "}
                    {this.truncateText(grill.Descriere, 60)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        {mobileGrills.length > 0 && (
          <div className="d-flex d-md-none flex-column align-items-center" 
          style={{
                  backgroundColor: "rgba(99, 1, 1, 1)",
                  padding: "10px",
                  borderRadius: "10px",
                }}>
            <h2 className="mb-4 text-white text-center">My Grills</h2>
            <div className="d-flex align-items-center mb-3 gap-2">
              <button className="btn btn-secondary" onClick={this.prevMobile}>
                &lt;
              </button>

              <div
                className="d-flex gap-2"
              >
                {mobileGrills.map((grill) => (
                  <div
                    key={grill._id}
                    className="card shadow-sm text-center"
                    style={{ width: "120px", cursor: "pointer" }}
                    onClick={() => this.openGrillModal(grill, false)}
                  >
                    <img
                      src={`${import.meta.env.VITE_API_URL}/uploads/${grill.Image}`}
                      alt={grill.Titlu}
                      className="card-img-top"
                      style={{
                        width: "100%",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="card-body">
                      <h5 className="card-title" style={{ fontSize: "14px" }}>
                        {this.truncateText(grill.Titlu, 20)}
                      </h5>
                      <p style={{ fontSize: "12px" }}>
                        <strong>Rating:</strong> {grill.Rating} Mici
                      </p>
                      <p style={{ fontSize: "12px" }}>
                        {this.truncateText(grill.Descriere, 40)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="btn btn-secondary" onClick={this.nextMobile}>
                &gt;
              </button>
            </div>
          </div>
        )}

        {/* Modal */}
        <div
          className={`modal fade ${showModal ? "show d-block" : "d-none"}`}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              {/* VIEW MODE */}
              {selectedGrill && !editMode && (
                <>
                  <div className="modal-header">
                    <button
                      type="button"
                      className="btn-close"
                      onClick={this.closeModal}
                    ></button>
                  </div>
                  <div className="modal-body">
                    {/* Desktop */}
                    <div className="d-none d-md-flex row">
                      <div className="col-md-5">
                        <img
                          src={`${import.meta.env.VITE_API_URL}/uploads/${selectedGrill.Image}`}
                          alt={selectedGrill.Titlu}
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                            borderRadius: "5px",
                          }}
                        />
                      </div>
                      <div className="col-md-7 d-flex flex-column justify-content-between">
                        <div>
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <div>
                              <h4 style={{ wordWrap: "break-word" }}>
                                {selectedGrill.Titlu}
                              </h4>
                              <p
                                className="mb-0"
                                style={{ wordWrap: "break-word" }}
                              >
                                <strong>User:</strong> {user.Nume}{" "}
                                {user.Prenume}
                              </p>
                              <p
                                className="mb-0"
                                style={{ wordWrap: "break-word" }}
                              >
                                <strong>Rating:</strong> {selectedGrill.Rating}{" "}
                                Mici
                              </p>
                            </div>
                            <div>
                              <button
                                className="btn btn-danger me-2"
                                onClick={() =>
                                  this.deleteGrill(selectedGrill._id)
                                }
                                style={{
                                  backgroundColor: "rgba(255, 0, 0, 1)",
                                  borderColor: "rgba(0, 0, 0, 1)",
                                  fontWeight: "bold",
                                }}
                              >
                                Delete Post
                              </button>
                              <button
                                className="btn btn-primary"
                                onClick={() =>
                                  this.openGrillModal(selectedGrill, true)
                                }
                                style={{
                                  backgroundColor: "rgba(172, 86, 5, 1)",
                                  borderColor: "rgba(0, 0, 0, 1)",
                                  fontWeight: "bold",
                                }}
                              >
                                Edit Post
                              </button>
                            </div>
                          </div>
                          <div>
                            <h5>Description</h5>
                            <p style={{ wordWrap: "break-word" }}>
                              {selectedGrill.Descriere}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile inside modal */}
                    <div className="d-flex d-md-none flex-column">
                      <h4 style={{ wordWrap: "break-word" }}>
                        {selectedGrill.Titlu}
                      </h4>
                      <p style={{ wordWrap: "break-word" }}>
                        <strong>User:</strong> {user.Nume} {user.Prenume}
                      </p>
                      <img
                        src={`${import.meta.env.VITE_API_URL}/uploads/${selectedGrill.Image}`}
                        alt={selectedGrill.Titlu}
                        style={{
                          width: "100%",
                          height: "auto",
                          objectFit: "cover",
                          borderRadius: "5px",
                          marginBottom: "10px",
                        }}
                      />
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <p className="mb-0" style={{ wordWrap: "break-word" }}>
                          <strong>Rating:</strong> {selectedGrill.Rating} Mici
                        </p>
                        <div>
                          <button
                            className="btn btn-danger me-2"
                            onClick={() => this.deleteGrill(selectedGrill._id)}
                            style={{
                              backgroundColor: "rgba(255, 0, 0, 1)",
                              borderColor: "rgba(0, 0, 0, 1)",
                              fontWeight: "bold",
                            }}
                          >
                            Delete Post
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              this.openGrillModal(selectedGrill, true)
                            }
                            style={{
                              backgroundColor: "rgba(172, 86, 5, 1)",
                              borderColor: "rgba(0, 0, 0, 1)",
                              fontWeight: "bold",
                            }}
                          >
                            Edit Post
                          </button>
                        </div>
                      </div>
                      <div>
                        <h5>Description</h5>
                        <p style={{ wordWrap: "break-word" }}>
                          {selectedGrill.Descriere}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* EDIT MODE */}
              {editMode && (
                <>
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {selectedGrill ? "Edit Grill" : "Create New Grill"}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={this.closeModal}
                    ></button>
                  </div>
                  <div className="modal-body">
                    {selectedGrill ? (
                      <EditGrill
                        grillID={selectedGrill._id}
                        closeModal={() => {
                          this.closeModal();
                          this.fetchGrills();
                        }}
                      />
                    ) : (
                      <CreateGrill
                        closeModal={() => {
                          this.closeModal();
                          this.fetchGrills();
                        }}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {showModal && <div className="modal-backdrop fade show"></div>}
      </div>
    );
  }
}
