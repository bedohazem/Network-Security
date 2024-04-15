import React, { useState, useEffect, useRef } from "react";
import "./courses.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalHeader from "react-bootstrap/ModalHeader";
import ListGroup from "react-bootstrap/ListGroup";

function Courses() {
  const [modalState, setModalState] = useState("close");
  const [modalData, setmodalData] = useState("");
  const [res, setRes] = useState("");
  const [data, setData] = useState([]);
  const [instrucotrs , setInstructors] = useState([]);
  const courseName  = useRef(), instrucotr_id  = useRef()  , code = useRef()  ,status = useRef() ,course_id=useRef();
  const token = JSON.parse(localStorage.getItem("user")).token;
  const user_id = JSON.parse(localStorage.getItem("user")).id;
  const fetchInfo = () => {
    return fetch("http://localhost:4000/adminCourse", {   //get courses
      method: "GET", headers: {
        "token":token, 'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((d) => setData(d))
  }
  const fetchInstructors = () => {
    return fetch("http://localhost:4000/manageinstructor", {
      method: "GET", headers: {
        "token": token, 'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((d) => setInstructors(d))
  }


  useEffect(() => {                 /// wait to load then exec
    fetchInfo();
    fetchInstructors();
  }, [])

  const HandleAdd = (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/adminCourse", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "token": token
      },body: JSON.stringify({name:courseName.current.value , code:code.current.value  , status:1 })
    },
    ).then(function (response) {
      return response.json();
    }).then(function (json) {
      return json;
    }).then(function (result) {
      if (result.errors) {
        setRes(result.errors[0].msg)
      } else {
        setRes("added successfully")
         window.location.reload();
      }
    })
  }
  const HandleAssign = (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/assigninstructors", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "token": token
      },body: JSON.stringify({courseId:course_id.current.value , userId:instrucotr_id.current.value  , status:1 })
    },
    ).then(function (response) {
      // return response.json();
    }).then(function (json) {
      return json;
    }).then(function (result) {
      window.location.reload();

    })
  }
  const HandleUpdate = (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/adminCourse/"+course_id.current.value, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "token": token
      },body: JSON.stringify({name:courseName.current.value , code:code.current.value  , status:1 })
    },
    ).then(function (response) {
      return response.json();
    }).then(function (json) {
      return json;
    }).then(function (result) {
      if (result.errors) {
        setRes(result.errors[0].msg)
      } else {
        setRes("updated successfully")
        window.location.reload();
      }
    })
  }

    ;
  const handleShowModalOne = () => {
    setModalState("modal-one");
  };

  function handleShowModalTwo(data) {
    setModalState("modal-two");
    setmodalData(data)
  };

  const handleShowModalThree = (data) => {
    setModalState("modal-three");
    setmodalData(data)
  };
  const handleClose = () => {
    setModalState("close");
  };
  
  const HandleDelete = (id)=>{
    if(window.confirm("are you shure ?")){
    fetch("http://localhost:4000/adminCourse/"+id, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "token": token
      }
    },
    ).then(function (response) {
      return response.json();
    }).then(function (json) {
      return json;
    }).then(function (result) {
      if (result.errors) {
        setRes(result.errors[0].msg)
      } else {
        setRes("deleted successfully")
         window.location.reload();
      }
    })}
  }




  return (
    <div className="shadow-lg main-table">
      <div className="page-header">
        {" "}
        <h1 className="page-title">Courses</h1>
        <Button variant="primary" onClick={handleShowModalOne}>
          + Add new Course
        </Button>
      </div>



      {/* Start Table */}
      <table class="table table-white table-striped text-Primary">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Code</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>

          {data.map((dataObj, index) => {
            return (
              <tr>
                <th scope="row">{index}</th>
                <td>{dataObj.name}</td>
                <td>{dataObj.code}</td>
                <td>{dataObj.status == 1 ? 'active' : 'disactive'}</td>
                <td>
                  {" "}
                  <Button
                    class="btn btn-primary ms-2"
                    data-bs-target="#updateModal"
                    onClick={() => handleShowModalTwo(dataObj)}
                  >
                    Update
                  </Button>
                  <Button
                    class="btn btn-primary  ms-2 "
                    data-bs-target="#updateModal"
                    onClick={() => handleShowModalThree(dataObj)}
                  >
                    Assign Instructor
                  </Button>
                  <button onClick={()=>HandleDelete(dataObj.id)} type="button" class="btn btn-danger ms-2 ">
                    Delete
                  </button>
                </td>
              </tr>

            );
          })}


        </tbody>
      </table>
      {/* End Table */}

      {/*start Add Modal */}
      <Modal show={modalState === "modal-one"} animation={false}>
        <ModalHeader style={{ fontSize: "16px", fontWeight: "Bold" }}>
          Add New Course
        </ModalHeader>

        <ModalBody>
          {res != "" ?
            <div className="alert alert-info">
              {res}
            </div> : ''
          }

          <form onSubmit={HandleAdd}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Course Name
              </label>
              <input
                type="text"
                class="form-control"
                id="addCourse"
                aria-describedby="emailHelp"
                ref={courseName}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Code
              </label>
              <input ref={code} type="" class="form-control" id="addCode" />
            </div>
       
            <Button type="submit">Save Changes</Button>

          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      {/*End Add Modal */}

      {/*start update Modal */}
      <Modal show={modalState === "modal-two"} modalData={modalData} animation={false}>
        <ModalHeader style={{ fontSize: "16px", fontWeight: "Bold" }}>
          Update Course
        </ModalHeader>

        <ModalBody>
          {" "}
          <form onSubmit={HandleUpdate}>

          {res != "" ?
            <div className="alert alert-info">
              {res}
            </div> : ''
          } 
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Course Name
              </label>
              <input
                type="text"
                class="form-control"
                id="updateCourse"
                defaultValue={modalData.name}
                aria-describedby="emailHelp"
                ref={courseName}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Code
              </label>
              <input type="" class="form-control" id="updateCode" defaultValue={modalData.code} ref={code} />
              <input type="hidden" ref={course_id}  value={modalData.id}/>
            </div>
            <Button type="submit">Save Changes</Button>

          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      {/*End update Modal */}


      {/*start Assign-Instructo Modal */}
      <Modal show={modalState === "modal-three"} modalData={modalData} animation={false}>
        <ModalHeader style={{ fontSize: "16px", fontWeight: "Bold" }}>
          Assign Instructor
        </ModalHeader>

        <ModalBody>
          
        {res != "" ?
            <div className="alert alert-info">
              {res}
            </div> : ''
          }

          {" "}
          <form onSubmit={HandleAssign}>
          {res != "" ?
            <div className="alert alert-info">
              {res}
            </div> : ''
          }
            <div className="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Assign Instructor
              </label>
             <select ref={instrucotr_id} className="form-control">
              {instrucotrs.map((dataObj, index) => {
            return (
            <option value={dataObj.id}>{dataObj.name}</option>

            );
          })}
</select>
  <input type="hidden" value={modalData.id} ref={course_id} />
           
            </div>
            <Button type="submit">Save Changes</Button>

          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      {/*End Assign-Instructor Modal */}
    </div>
  );
}

export default Courses;
