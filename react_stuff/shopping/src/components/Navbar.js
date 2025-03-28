import {NavLink} from 'react-router-dom';
import '../styles/navrbar.css';
import {useState} from 'react';

export default function Navbar(){
    return (
        <div className="nav-bar">
            <NavLink data-testid="homelink" className="logo" to="/">
            Midnight Sun
            </NavLink>
            <div className="nav-links">
                <NavLink
                    to="shop"
                    style={({isActive})=>({
                        textDecoration: isActive? 'underline':null,
                        textDecorationColor: isActive ? 'white' :null,
                        textDecorationThickness:isActive ?'3px':null,
                        textUnderlineOffset:isActive ?'5px': null ,
                    })}
                >
                    Shop
                </NavLink>
                <NavLink
          to="about"
          style={({ isActive }) => ({
            textDecoration: isActive ? 'underline' : null,
            textDecorationColor: isActive ? 'white' : null,
            textDecorationThickness: isActive ? '3px' : null,
            textUnderlineOffset: isActive ? '5px' : null,
          })}
        >
          About
        </NavLink>
        <NavLink
          to="contact"
          style={({ isActive }) => ({
            textDecoration: isActive ? 'underline' : null,
            textDecorationColor: isActive ? 'white' : null,
            textDecorationThickness: isActive ? '3px' : null,
            textUnderlineOffset: isActive ? '5px' : null,
          })}
        >
          Contact
        </NavLink>
            </div>
            </div>
        );
}