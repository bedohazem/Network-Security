import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Sidebar from "./components/Admin/Layout/Sidebar/sidebar";
import Header from "./components/Header/header";
import Courses from "./components/Admin/Courses/courses";
import Instructors from "./components/Admin/Instructors/instructors";

import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SidebarTwo from "./components/InstructorComponent/layout-2/sidebarTwo";
import EnrolledStudents from "./components/InstructorComponent/EnrolledStudents/enrolledStudents";
import SidebarThree from "./components/StudentComponent/LayoutThree/sidebarThree";
import RegisteredCources from "./components/StudentComponent/RegisteredCourses/registeredCourses";
import Register from "./components/Register/register";
import Logout from "./components/logout/Logout";

function App() {
  const [token, setToken] = useState();
  const user = JSON.parse(localStorage.getItem("user")) ?? false;
  
  return (
    <div className="App" style={{ display: "flex", flexDirection: "row" }}>

      {
        user.role == 1 ? <Sidebar/> : (user.role == 2 ? <SidebarTwo /> : <SidebarThree/>)
      }

      <main
        className="main-content"
        style={{ width: "95%", marginRight: "5rem" }}
      >
        <BrowserRouter>
          <Header />
          <Routes>
          <Route path="/" element={<Login/>} ></Route>

            {/* Routes ForLogin and Register*/}   
            <Route path="/login" element={<Login/>} ></Route>
            <Route path="/register" element={<Register/>} ></Route>
           
           {/* logout */}
           <Route path="/logout" element={<Logout/>} ></Route>

            {/* Routes For Admin Component */}
            <Route path="/courses" element={<Courses />}></Route>
            <Route path="/instructors" element={<Instructors />}>
              {" "}
            </Route>
           

            {/* Routes For Instructors Component */}
            <Route
              path="/enrolledStudents"
              element={<EnrolledStudents />}
            ></Route>

            {/* Routes For Students Component */}
            <Route
              path="/registeredCources"
              element={<RegisteredCources />}
            ></Route>
          </Routes>
        </BrowserRouter>
        ,
      </main>
    </div>
  );
}

export default App;
