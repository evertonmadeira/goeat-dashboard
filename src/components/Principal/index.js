import React from "react";
import Navbar from "../Navbar";

export default function Principal() {
  const admin = localStorage.getItem("adminName");
  return (
    <>
      <Navbar />
      <div className="container">
        <div className=" content-section introduction" style={{}}>
          <div className="feature-intro">
            <h1>Página Principal</h1>
            <p>Bem vindo {admin}!</p>
          </div>
        </div>
      </div>
    </>
  );
}
