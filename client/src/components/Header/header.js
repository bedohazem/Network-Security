import React from "react";
import './header.css'
import { Link } from "react-router-dom";
function header(){
    return(
        <div><nav class="navbar shadow-lg">
       <div class="container-fluid">
    
    <div class="collapse navbar-collapse" id="navbarSupportedContent" >
      <div style={{"display":"flex", "justify-content":"space-between"}}>
     
      <Link to="/logout"><img src="icons/logout.svg" className="logout-icon"/></Link>
      </div>
    </div>
  </div>
      </nav></div>
    )
}
export default header