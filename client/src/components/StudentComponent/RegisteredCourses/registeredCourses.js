import React, { useState  , useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalHeader from "react-bootstrap/ModalHeader";
import ListGroup from "react-bootstrap/ListGroup";
import { useRef } from "react";

function RegisteredCources() {
  const user_id = JSON.parse(localStorage.getItem("user")).id;
  const token = JSON.parse(localStorage.getItem("user")).token;
  const [modalState, setModalState] = useState("close");
  const [data, setData] = useState([]);
  const [courses , setCourses] = useState([]);
  const [res, setRes] = useState("");


  const course_id = useRef();
  const fetchInfo = () => {
    return fetch("http://localhost:4000/studentCourse/"+user_id, {
      method: "GET", headers: {
        "token": token, 'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((d) => setData(d))
  }

  const fetchCourses = () => {
    return fetch("http://localhost:4000/adminCourse", {
      method: "GET", headers: {
        "token": token, 'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((d) => setCourses(d))
  }

  useEffect(() => {
    fetchInfo();
    fetchCourses();
  }, [])


  const HandleRegister = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/studentCourse", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "token": token
      },body: JSON.stringify({courseId:course_id.current.value , userId:user_id  })
    },
    ).then(function (response) {
      return response;
    }).then(function (json) {
      return json;
    }).then(function (result) {
  
        window.location.reload();
      
    })
  };
  const handleShowModalOne = () => {
    setModalState("modal-one");
  };

  const handleClose = () => {
    setModalState("close");
  };

  return (
    <div className="shadow-lg main-table">
      <div className="page-header">
        {" "}
        <h1 className="page-title">Registered Cources</h1>
        <Button variant="primary" d onClick={handleShowModalOne}>
          + Register New Course
        </Button>
      </div>

      {/* Start Table */}
      <table class="table table-white table-striped text-Primary">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th scope="col">Grade</th>
          </tr>
        </thead>

        
        <tbody>
        {data.map((dataObj, index) => {
            return (
              <tr>
              <th scope="row">{index}</th>
              <td>{dataObj.name}</td>
              <td>{dataObj.status == 1 ? 'active' : 'disactive'}</td>
              <td>{dataObj.grade}</td>
            </tr>

            );
          })}
     
        </tbody>
      </table>
      {/* End Table */}

      {/*start Add Modal */}
      <Modal show={modalState === "modal-one"} animation={false}>
        <ModalHeader style={{ fontSize: "16px", fontWeight: "Bold" }}>
          Register New Course
        </ModalHeader>

        <ModalBody>
          <form onSubmit={HandleRegister}>
          {res != "" ?
            <div className="alert alert-info">
              {res}
            </div> : ''
          }
            <div className="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Select Course
              </label>
              <select ref={course_id} className="form-control">
              {courses.map((dataObj, index) => {
            return (
            <option value={dataObj.id}>{dataObj.name}</option>

            );
          })}
      </select>
            </div>
            <Button type="submit" >Save Changes</Button>

          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      {/*End Add Modal */}
    </div>
  );
}

export default RegisteredCources;
