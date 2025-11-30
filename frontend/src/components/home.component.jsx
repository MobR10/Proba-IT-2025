import React from "react";
import img1 from "../assets/Group 110.png";
import img2 from "../assets/Pimp Your Grill.png";
import img3 from "../assets/Group 111.png";

export default function Home() {
  const isUserLoggedIn = localStorage.getItem("loggedIn") === "true";

  return (
    <div
      className="home-container"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <div style={{ flex: 1 }}>
        {/* Overlayed images */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "40vh",
            maxHeight: "400px",
            overflow: "hidden",
          }}
        >
          <img
            src={img1}
            alt="Background"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <img
            src={img2}
            alt="Overlay"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Separator rectangle with text */}
        <div
          style={{
            width: "100%",
            height: "60px",
            backgroundColor: "rgba(99, 1, 1, 1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          {isUserLoggedIn
            ? "Ai intrat în cont. Aici ar trebui cineva de la PR să vină cu un text mai bun :)"
            : "Înregistrează-te pentru a intra și tu în cea mai mare rețea de grătaragii din lume!"}
        </div>

        {/* Bottom image */}
        <div style={{ width: "100%" }}>
          <img
            src={img3}
            alt="Bottom"
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </div>
      </div>

      
    </div>
  );
}
