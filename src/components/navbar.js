import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">Admin</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/admin/user">Usuários<span className="sr-only"></span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/admin/item">Produtos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/admin/table">Mesas</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
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