import React, { useState , useRef , useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalHeader from "react-bootstrap/ModalHeader";
function Instructors() {
  const [modalState, setModalState] = useState("close");
  const [modalData, setmodalData] = useState("");
  const [res, setRes] = useState("");
  const [] = useState("");
  const [data, setData] = useState([]);
  const instructor_name  = useRef()  , email = useRef()  ,phone = useRef() ,password=useRef() , instrucotr_id = useRef();
  const token = JSON.parse(localStorage.getItem("user")).token;
  const user_id = JSON.parse(localStorage.getItem("user")).id;

  const fetchInfo = () => {
    return fetch("http://localhost:4000/manageinstructor", {
      method: "GET", headers: {
        "token": token, 'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((d) => setData(d))
  }


  useEffect(() => {
    fetchInfo();
  }, [])

  const HandleAdd = (e) => {
    e.preventDefault();
//
    fetch("http://localhost:4000/manageinstructor", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "token": token
      },body: JSON.stringify({name:instructor_name.current.value , phone:phone.current.value  , email:email.current.value ,password:password.current.value ,status:1 ,role:2 })
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
  const HandleUpdate = (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/manageinstructor/"+instrucotr_id.current.value, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "token": token
      },body:JSON.stringify({name:instructor_name.current.value , phone:phone.current.value  , email:email.current.value ,password:password.current.value })
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


  const HandleDelete = (id)=>{
    if(window.confirm("are you shure ?")){
    fetch("http://localhost:4000/manageinstructor/"+id, {
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


  const handleShowModalOne = () => {
    setModalState("modal-one")
  }

  function handleShowModalTwo(data) {
    setModalState("modal-two");
    setmodalData(data)
  };

  const handleClose = () => {
    setModalState("close")
  }

  return (
    <div className="shadow-lg main-table" >
      <div className="page-header"> <h1 className="page-title">
        Instructors
      </h1>
        <Button variant="primary" d onClick={handleShowModalOne}>
          + Add new Instructor
        </Button></div>

      <table class="table table-white table-striped text-Primary" >
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">status</th>
            <th scope="col">Actions</th>

          </tr>
        </thead>
        <tbody>
        {data.map((dataObj, index) => {
            return (
              <tr>
                <th scope="row">1</th>
                <td>{dataObj.name}</td>
                <td>{dataObj.email}</td>
                <td>{dataObj.phone}</td>
                <td>{dataObj.status == 1 ? 'active' : 'disactive'}</td>
                <td>  
            <Button class="btn btn-primary ms-2" data-bs-target="#updateModal" onClick={()=>handleShowModalTwo(dataObj)}>
              Update
            </Button>
              <button onClick={()=>HandleDelete(dataObj.id)} type="button" class="btn btn-danger ms-2" >
                Delete
              </button></td>
              </tr>

            );
          })}
      
        </tbody>
      </table>




      {/*start Add Modal */}
      <Modal show={modalState === "modal-one"}
        animation={false}
      >
        <ModalHeader style={{ "fontSize": "16px", "fontWeight": "Bold" }}>Add New Instructor</ModalHeader>

        <ModalBody>

        {res != "" ?
            <div className="alert alert-info">
              {res}
            </div> : ''
          }

          <form onSubmit={HandleAdd}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">name</label>
              <input type="text" class="form-control" id="addEmail" ref={instructor_name} aria-describedby="emailHelp" />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">email</label>
              <input type="email" class="form-control" id="addPhone" ref={email} />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Phone</label>
              <input type="text" class="form-control" id="addPhone" ref={phone} />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">password</label>
              <input type="password" class="form-control" id="addPhone" ref={password} />
            </div>
            <Button type="submit">Save Changes</Button>

          </form></ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={handleClose}>Close</Button>
        </ModalFooter>
      </Modal>
      {/*End Add Modal */}


      {/*start update Modal */}
      <Modal show={modalState === "modal-two"} modalData={modalData} animation={false}
      >
        <ModalHeader style={{ "fontSize": "16px", "fontWeight": "Bold" }}>Update Instructor</ModalHeader>

        <ModalBody>
        {res != "" ?
            <div className="alert alert-info">
              {res}
            </div> : ''
          }
   
          <form onSubmit={HandleUpdate}>
          <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">name</label>
              <input type="text" class="form-control" defaultValue={modalData.name} id="addEmail" ref={instructor_name} aria-describedby="emailHelp" />
              <input type="hidden" value={modalData.id} ref={instrucotr_id} />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">email</label>
              <input type="email" class="form-control"  defaultValue={modalData.email} id="addPhone" ref={email} />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Phone</label>
              <input type="text" class="form-control" id="addPhone"  defaultValue={modalData.phone} ref={phone} />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">password</label>
              <input type="password" class="form-control" id="addPhone"   ref={password} />
            </div>
          <Button type="submit">Save Changes</Button>

        </form></ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={handleClose}>Close</Button>
        </ModalFooter>
      </Modal>
      {/*End update Modal */}
    </div>
  )
}

export default Instructors;