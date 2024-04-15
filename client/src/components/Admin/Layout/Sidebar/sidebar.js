import React, { Component, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './sidebar.css'
import { Outlet, Link,useN } from "react-router-dom";

const Sidebar = () => {
  const [isExpanded, setExpandState] = useState(true);
  return (
    <div className={isExpanded ? "side-nav-container" : "side-nav-container side-nav-container-NX"}>
      <div className="nav-uper">
        <div className="nav-heading">
          {isExpanded && (
            <div className="nav-brand">
              <img src="LMSLogo-light.png" />
              <h2>L.M.S</h2>
              <hr style={{"background":"#fff"}}/>
            </div>)}
          <button className={
            isExpanded ? "humburger humberger-in" : "humburher humburger-out"
          }
            onClick={() => setExpandState(!isExpanded)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className="nav-menu">
        
           
        <a href="/instructors"
           className={!isExpanded ? "menu-item": "menu-item menu-item-NX"}>
            <img src="icons/user.svg" alt="" srcset=""/>
           {isExpanded && <p>Instructors</p>}
          {!isExpanded && <div className="tooltip">{Text}</div>}
           </a>
          
        <a href="/courses"
           className={!isExpanded ? "menu-item": "menu-item menu-item-NX"}>
            <img src="icons/book.svg" alt="" srcset=""/>
           {isExpanded && <p>
            courses</p>}
          {!isExpanded && <div className="tooltip">{Text}</div>}
           </a>
           
           
          
        </div>
      </div>

    </div>
  )
};


export default Sidebar