import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { FaSearch } from "react-icons/fa";
import logo from '../../assets/Images/logo.png';
import './Navbarstyle.css';

const Navbar = ({onHome, onNotes}) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  
  return (
    <div className="main-nav">
        <div className="nav-container">
            <div className="navbar-links">
                <div className="navbar-links_logo">
                    <img src={logo} alt='logo' />
                </div>
            </div>
            <div className="search">
                <input type="text" className="searchTerm" placeholder="What are you looking for?"/>
                <button type="submit" className="searchButton">
                    <FaSearch />
                </button>
            </div>
            <div className="navbar-links_container">
                <p><li onClick={onHome} >Home</li></p>
                <p><li onClick={onNotes} >Reference</li></p>
                <p><li  >Letters</li></p>
            </div>
        
            <div className="navbar-menu">
            {toggleMenu
                ? <RiCloseLine color="#000" size={20} onClick={() => setToggleMenu(false)} />
                : <RiMenu3Line color="#000" size={20} onClick={() => setToggleMenu(true)} />}
            
                {toggleMenu && (
                <div className="navbar-menu_container scale-up-center">
                    <div className="navbar-menu_container-links">
                    <p><li  >Home</li></p>
                    <p><li  >Notes</li></p>
                    <p><li  >Letters</li></p>
                    </div>
                </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default Navbar;
