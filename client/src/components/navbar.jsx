import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark row fixed-bottom">
            <div className="container row">
                <ul className="navbar-nav col-12 ms-5 row">
                    <li className="nav-item col">
                        <Link className="nav-link" to="/home"><FontAwesomeIcon icon={faHome} /></Link>
                    </li>
                    <li className="nav-item col">
                        <Link className="nav-link" to="/search"><FontAwesomeIcon icon={faSearch} /></Link>
                    </li>
                    <li className="nav-item col">
                        <Link className="nav-link" to="/profile"><FontAwesomeIcon icon={faUser} /></Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
