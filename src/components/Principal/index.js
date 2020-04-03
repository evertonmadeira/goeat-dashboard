import React, { Component } from "react";
import Navbar from "../Navbar";

export default class Principal extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div>
          <div className="content-section introduction">
            <div className="feature-intro">
              <h1>Página Principal</h1>
              <p>Esta deve ser a página principal.</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
