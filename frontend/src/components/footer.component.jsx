// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className=" text-white py-4" style={{backgroundColor: "rgba(99, 1, 1, 1)"}}>
      <div className="container-fluid">

        <div className="d-flex justify-content-center align-items-center gap-4">

          {/* Contact text */}
          <span className="fs-5">Contact</span>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/lsacbucuresti/?hl=ro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white fs-3"
          >
            <i className="bi bi-instagram"></i>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/LsacBucuresti/?locale=ro_RO"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white fs-3"
          >
            <i className="bi bi-facebook"></i>
          </a>

          {/* YouTube */}
          <a
            href="https://www.youtube.com/user/LSACBucuresti"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white fs-3"
          >
            <i className="bi bi-youtube"></i>
          </a>

          {/* Twitch */}
          <a
            href="https://www.twitch.tv/lsac_bucuresti"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white fs-3"
          >
            <i className="bi bi-twitch"></i>
          </a>

        </div>
      </div>
    </footer>
  );
}
