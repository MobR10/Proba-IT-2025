import React, { Component } from "react";
import axios from "axios";
import EditGrill from "./edit-grill.component";

export default class Grills extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grills: [],
      filteredGrills: [],
      showModal: false,
      selectedGrill: null,
      editMode: false,
      searchQuery: "",
      currentIndexAll: 0,
      currentIndexTop: 0,
      showScrollTop: false,
    };

    this.loggedInUserID = localStorage.getItem("userID");
    this.userRole = localStorage.getItem("userRole");

    this.searchBarRef = React.createRef();
  }

  componentDidMount() {
    this.fetchGrills();
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (!this.searchBarRef.current) return;
    const rect = this.searchBarRef.current.getBoundingClientRect();

    if (window.innerWidth >= 768) {
      this.setState({ showScrollTop: rect.bottom < 0 });
    } else {
      this.setState({ showScrollTop: false });
    }
  };

  scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  fetchGrills = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/grills/`)
      .then((response) => {
        this.setState({
          grills: response.data || [],
          filteredGrills: response.data || [],
          currentIndexAll: 0,
          currentIndexTop: 0,
        });
      })
      .catch((err) => console.error("Error fetching grills:", err));
  };

  handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = this.state.grills.filter((grill) =>
      grill.Titlu.toLowerCase().includes(query)
    );
    this.setState({
      searchQuery: query,
      filteredGrills: filtered,
      currentIndexAll: 0,
      currentIndexTop: 0,
    });
  };

  openGrillModal = (grill, editMode = false) => {
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
        this.setState((prevState) => ({
          grills: prevState.grills.filter((g) => g._id !== grillID),
          filteredGrills: prevState.filteredGrills.filter(
            (g) => g._id !== grillID
          ),
          currentIndexAll: 0,
          currentIndexTop: 0,
        }));
        this.closeModal();
      })
      .catch((err) => console.error(err));
  };

  increaseRating = (grill) => {
    if (!this.loggedInUserID || grill.User?._id === this.loggedInUserID) return;

    axios
      .post(`${import.meta.env.VITE_API_URL}/grills/increaseRating/${grill._id}`)
      .then(() => {
        this.closeModal()
        this.fetchGrills()
      })
      .catch((err) => console.error("Error increasing rating:", err));
  };

  // --- FIX: MOBILE CAROUSEL ADVANCES BY ONE AT A TIME ---
  prevAll = () => {
    const { filteredGrills, currentIndexAll } = this.state;
    if (filteredGrills.length === 0) return;
    const newIndex =
      (currentIndexAll - 1 + filteredGrills.length) % filteredGrills.length;
    this.setState({ currentIndexAll: newIndex });
  };

  nextAll = () => {
    const { filteredGrills, currentIndexAll } = this.state;
    if (filteredGrills.length === 0) return;
    const newIndex = (currentIndexAll + 1) % filteredGrills.length;
    this.setState({ currentIndexAll: newIndex });
  };

  prevTop = (topGrills) => {
    const { currentIndexTop } = this.state;
    if (topGrills.length === 0) return;
    const newIndex =
      (currentIndexTop - 1 + topGrills.length) % topGrills.length;
    this.setState({ currentIndexTop: newIndex });
  };

  nextTop = (topGrills) => {
    const { currentIndexTop } = this.state;
    if (topGrills.length === 0) return;
    const newIndex = (currentIndexTop + 1) % topGrills.length;
    this.setState({ currentIndexTop: newIndex });
  };

  render() {
    const {
      filteredGrills,
      showModal,
      selectedGrill,
      editMode,
      searchQuery,
      currentIndexAll,
      currentIndexTop,
      showScrollTop,
    } = this.state;

    const topGrills = [...filteredGrills]
      .sort((a, b) => b.Rating - a.Rating)
      .slice(0, 6);

    const currentMobileAll = [
      filteredGrills[currentIndexAll],
      filteredGrills[(currentIndexAll + 1) % filteredGrills.length],
    ].filter(Boolean);

    const currentMobileTop = [
      topGrills[currentIndexTop],
      topGrills[(currentIndexTop + 1) % topGrills.length],
    ].filter(Boolean);

    const isOwnerOrAdmin =
      this.userRole === "admin" ||
      selectedGrill?.User?._id === this.loggedInUserID;

    return (
      <div className="container py-5">
        {/* Search Bar */}
        <div
          ref={this.searchBarRef}
          className="mb-4 d-flex justify-content-center"
        >
          <div style={{ maxWidth: "400px", width: "100%" }} className="position-relative">
            <input
              type="text"
              className="form-control rounded-pill ps-4 pe-5"
              placeholder="Search"
              value={searchQuery}
              onChange={this.handleSearch}
              style={{ fontWeight: "bold" }}
            />
            <i
              className="bi bi-search position-absolute"
              style={{
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                color: "#6c757d",
              }}
            ></i>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="row d-none d-md-flex">
          <div className="col-md-8" style={{ backgroundColor: "rgba(99,1,1,1)", padding: "10px", borderRadius: "10px" }}>
            <h5 className="mb-3" style={{ color: "white" }}>Grills for pimps</h5>
            <div className="row g-3">
              {filteredGrills.map((grill, index) => (
                <div key={index} className="col-12 col-sm-6">
                  <div
                    className="card shadow-sm h-100 text-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => this.openGrillModal(grill)}
                  >
                    <p className="mt-2">
                      <strong>User:</strong> {grill.User ? `${grill.User.Nume} ${grill.User.Prenume}` : "Unknown"}
                    </p>
                    <img
                      src={`${import.meta.env.VITE_API_URL}/uploads/${grill.Image}`}
                      alt={grill.Titlu}
                      className="card-img-top"
                      style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }}
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

          <div className="col-md-4" style={{ backgroundColor: "rgba(99,1,1,1)", padding: "10px", borderRadius: "10px" }}>
            <h5 className="mb-3" style={{ color: "white" }}>THE BEST GRILLS</h5>
            <div className="row g-3">
              {topGrills.map((grill, index) => (
                <div key={index} className="col-12">
                  <div
                    className="card shadow-sm h-100 text-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => this.openGrillModal(grill)}
                  >
                    <p className="mt-2">
                      <strong>User:</strong> {grill.User ? `${grill.User.Nume} ${grill.User.Prenume}` : "Unknown"}
                    </p>
                    <img
                      src={`${import.meta.env.VITE_API_URL}/uploads/${grill.Image}`}
                      alt={grill.Titlu}
                      className="card-img-top"
                      style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }}
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
        </div>

        {/* Mobile Sliders */}
        <div className="d-flex d-md-none flex-column align-items-center gap-4">
          {currentMobileTop.length > 0 && (
            <>
              <h5 className="text-center" style={{ backgroundColor: "rgba(99,1,1,1)", padding: "10px", borderRadius: "10px", color: "white" }}>
                THE BEST GRILLS
              </h5>
              <div className="d-flex align-items-center gap-2 mt-2">
                <button className="btn btn-outline-secondary" onClick={() => this.prevTop(topGrills)}>
                  <i className="bi bi-chevron-left"></i>
                </button>

                <div className="d-flex gap-2" style={{ backgroundColor: "rgba(99,1,1,1)", padding: "10px", borderRadius: "10px" }}>
                  {currentMobileTop.map((grill, idx) => (
                    <div key={idx} className="card shadow-sm text-center" style={{ width: "120px", cursor: "pointer" }} onClick={() => this.openGrillModal(grill)}>
                      <p className="mt-2" style={{ fontSize: "12px" }}>
                        <strong>User:</strong> {grill.User ? `${grill.User.Nume} ${grill.User.Prenume}` : "Unknown"}
                      </p>
                      <img
                        src={`${import.meta.env.VITE_API_URL}/uploads/${grill.Image}`}
                        alt={grill.Titlu}
                        className="card-img-top"
                        style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title" style={{ fontSize: "14px" }}>{grill.Titlu}</h5>
                        <p style={{ fontSize: "12px" }}><strong>Rating:</strong> {grill.Rating} Mici</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="btn btn-outline-secondary" onClick={() => this.nextTop(topGrills)}>
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            </>
          )}

          {currentMobileAll.length > 0 && (
            <>
              <h5 className="text-center mt-3" style={{ backgroundColor: "rgba(99,1,1,1)", padding: "10px", borderRadius: "10px", color: "white" }}>
                Grills for pimps
              </h5>
              <div className="d-flex align-items-center gap-2 mt-2">
                <button className="btn btn-outline-secondary" onClick={this.prevAll}>
                  <i className="bi bi-chevron-left"></i>
                </button>

                <div className="d-flex gap-2" style={{ backgroundColor: "rgba(99,1,1,1)", padding: "10px", borderRadius: "10px" }}>
                  {currentMobileAll.map((grill, idx) => (
                    <div key={idx} className="card shadow-sm text-center" style={{ width: "120px", cursor: "pointer" }} onClick={() => this.openGrillModal(grill)}>
                      <p className="mt-2" style={{ fontSize: "12px" }}>
                        <strong>User:</strong> {grill.User ? `${grill.User.Nume} ${grill.User.Prenume}` : "Unknown"}
                      </p>
                      <img
                        src={`${import.meta.env.VITE_API_URL}/uploads/${grill.Image}`}
                        alt={grill.Titlu}
                        className="card-img-top"
                        style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title" style={{ fontSize: "14px" }}>{grill.Titlu}</h5>
                        <p style={{ fontSize: "12px" }}><strong>Rating:</strong> {grill.Rating} Mici</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="btn btn-outline-secondary" onClick={this.nextAll}>
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Modal Render */}
        {selectedGrill && (
          <>
            <div className={`modal fade ${showModal ? "show d-block" : "d-none"}`} tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                  {!editMode && (
                    <>
                      <div className="modal-header">
                        <button type="button" className="btn-close" onClick={this.closeModal}></button>
                      </div>
                      <div className="modal-body">
                        {/* Desktop View */}
                        <div className="d-none d-md-flex row">
                          <div className="col-md-5">
                            <img
                              src={`${import.meta.env.VITE_API_URL}/uploads/${selectedGrill.Image}`}
                              alt={selectedGrill.Titlu}
                              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "5px" }}
                            />
                          </div>

                          <div className="col-md-7 d-flex flex-column justify-content-between">
                            <div>
                              <div className="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                  <h4 className="text-break">{selectedGrill.Titlu}</h4>
                                  <p className="mb-0 text-break"><strong>User:</strong> {selectedGrill.User ? `${selectedGrill.User.Nume} ${selectedGrill.User.Prenume}` : "Unknown"}</p>
                                  <p className="mb-0 text-break"><strong>Rating:</strong> {selectedGrill.Rating} Mici</p>
                                </div>

                                {isOwnerOrAdmin && (
                                  <div className="d-flex gap-2">
                                    <button
                                      className="btn btn-danger"
                                      onClick={() => this.deleteGrill(selectedGrill._id)}
                                      style={{ backgroundColor: "rgba(255,0,0,1)", borderColor: "rgba(0,0,0,1)", fontWeight: "bold" }}
                                    >
                                      Delete Post
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      onClick={() => this.openGrillModal(selectedGrill, true)}
                                      style={{ backgroundColor: "rgba(172,86,5,1)", borderColor: "rgba(0,0,0,1)", fontWeight: "bold" }}
                                    >
                                      Edit Post
                                    </button>
                                  </div>
                                )}
                              </div>

                              {this.loggedInUserID && selectedGrill.User?._id !== this.loggedInUserID && (
                                <button className="btn btn-success mt-2" onClick={() => this.increaseRating(selectedGrill)}>
                                  Give Mici
                                </button>
                              )}

                              <div>
                                <h5>Description</h5>
                                <p className="text-break">{selectedGrill.Descriere}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Mobile View */}
                        <div className="d-flex d-md-none flex-column">
                          <h4 className="text-break">{selectedGrill.Titlu}</h4>
                          <p className="text-break"><strong>User:</strong> {selectedGrill.User ? `${selectedGrill.User.Nume} ${selectedGrill.User.Prenume}` : "Unknown"}</p>

                          <img
                            src={`${import.meta.env.VITE_API_URL}/uploads/${selectedGrill.Image}`}
                            alt={selectedGrill.Titlu}
                            style={{ width: "100%", objectFit: "cover", borderRadius: "5px", marginBottom: "10px" }}
                          />

                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <p className="mb-0 text-break"><strong>Rating:</strong> {selectedGrill.Rating} Mici</p>

                            {isOwnerOrAdmin && (
                              <div className="d-flex flex-column flex-md-row gap-2">
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => this.deleteGrill(selectedGrill._id)}
                                  style={{ backgroundColor: "rgba(255,0,0,1)", borderColor: "rgba(0,0,0,1)", fontWeight: "bold", fontSize: "12px" }}
                                >
                                  Delete Post
                                </button>
                                <button
                                  className="btn btn-primary btn-sm"
                                  onClick={() => this.openGrillModal(selectedGrill, true)}
                                  style={{ backgroundColor: "rgba(172,86,5,1)", borderColor: "rgba(0,0,0,1)", fontWeight: "bold", fontSize: "12px" }}
                                >
                                  Edit Post
                                </button>
                              </div>
                            )}
                          </div>

                          {this.loggedInUserID && selectedGrill.User?._id !== this.loggedInUserID && (
                            <button className="btn btn-success btn-sm mb-2" onClick={() => this.increaseRating(selectedGrill)}>
                              Give Mici
                            </button>
                          )}

                          <div>
                            <h5>Description</h5>
                            <p className="text-break">{selectedGrill.Descriere}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {editMode && (
                    <>
                      <div className="modal-header">
                        <h5 className="modal-title">{selectedGrill ? "Edit Grill" : "Create New Grill"}</h5>
                        <button type="button" className="btn-close" onClick={this.closeModal}></button>
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
          </>
        )}

        {/* Scroll-to-top button */}
        {showScrollTop && (
          <button
            onClick={this.scrollToTop}
            style={{
              position: "fixed",
              bottom: "30px",
              right: "30px",
              zIndex: 1000,
              backgroundColor: "rgba(99,1,1,1)",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
            }}
          >
            <i className="bi bi-arrow-up"></i>
          </button>
        )}
      </div>
    );
  }
}