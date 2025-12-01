import React from "react";
import img1 from "../assets/Group 110.png";
import img2 from "../assets/Pimp Your Grill.png";
import img3 from "../assets/Group 111.png";

export default function Home() {
  const isUserLoggedIn = localStorage.getItem("loggedIn") === "true";

  return (
    <div className="container-fluid p-0">
      {/* Top section with overlay */}
      <div style={{ position: "relative", width: "100%", maxHeight: "50vh", overflow: "hidden" }}>
        <img
          src={img1}
          alt="Background"
          className="img-fluid w-100"
          style={{ objectFit: "contain", display: "block" }}
        />
        <img
          src={img2}
          alt="Overlay"
          className="img-fluid w-100"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            objectFit: "contain",
            maxHeight: "50vh",
            width: "100%",
          }}
        />
      </div>

      {/* Text bar */}
      <div
        className="py-4 text-center text-white fw-bold"
        style={{ backgroundColor: "rgba(99, 1, 1, 1)" }}
      >
        {isUserLoggedIn
          ? "Ai intrat în cont. Aici ar trebui cineva de la PR să vină cu un text mai bun :)"
          : "Înregistrează-te pentru a intra și tu în cea mai mare rețea de grătaragii din lume!"}
      </div>

      {/* Bottom image */}
      <img
        src={img3}
        alt="Bottom"
        className="img-fluid w-100"
        style={{ maxHeight: "50vh", objectFit: "contain", display: "block" }}
      />
    </div>
  );
}
