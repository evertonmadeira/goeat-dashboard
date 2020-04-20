import React from "react";
import { FaWhmcs } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import Footer from "../components/Footer";

export default function Navbar() {
  
  
  function logout() {
    // remove admin from local storage to log admin out
    localStorage.removeItem('token');
  }

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        style={{ marginBottom: 50 }}
      >
        <Link className="navbar-brand" to="/main">
          <FaWhmcs style={{ marginRight: 5 }} />
          Admin
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/user">
                Usuários<span className="sr-only"></span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/item">
                Produtos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/table">
                Mesas
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
                onClick={logout}
                style={{ marginLeft: 905 }}
              >
                <FaSignOutAlt size={20} />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="fixed-bottom">
        <Footer />
      </div>
    </>
  );
}

//  <div className="container">
//           <nav className="col-md-2 d-none d-md-block bg-light sidebar">
//             <Link to="/" className="navbar-brand">MERN</Link>
//             <div className="side-bar sticky">
//               <ul className="nav flex-column">
//                 <li className="nav-item">
//                   <Link to="/admin/user" className="nav-link active">Usuários</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/admin/mesas" className="nav-link active">Mesas</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/admin/item" className="nav-link active">Produtos</Link>
//                 </li>
//               </ul>
//             </div>
//           </nav>
//         </div>
//         );

//////////////////////////////////////////////////////////////////////////////
