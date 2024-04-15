import React, { Component, useRef, useState } from 'react'
function Logout() {
    
    localStorage.removeItem("user");
    window.location.href = '/login';

}


export default Logout;