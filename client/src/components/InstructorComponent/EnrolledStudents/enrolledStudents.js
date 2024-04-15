import React,{useState , useEffect , useRef} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalHeader from "react-bootstrap/ModalHeader";
import Courses from "../../Admin/Courses/courses";
function EnrolledStudents() {
  const [modalState, setModalState] = useState("close");
  const token = JSON.parse(localStorage.getItem("user")).token;
  const user_id = JSON.parse(localStorage.getItem("user")).id;

  const [data, setData] = useState([]);
  const [students , setStudents] = useState([]);
  const [gradeId , setgradeId] = useState([]);
  const [res, setRes] = useState("");
  const grade = useRef();
  const fetchInfo = () => {
    return fetch("http://localhost:4000/course/instructor_courses/"+user_id, {
      method: "GET", headers: {
        "token": token, 'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((d) => setData(d))
  }

  // const fetchCourses = () => {
  //   return fetch("http://localhost:4000/adminCourse", {
  //     method: "GET", headers: {
  //       "token": token, 'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((d) => setCourses(d))
  // }

  useEffect(() => {
    fetchInfo();
    // fetchCourses();
  }, [])

  const handleShowModalOne = () => {
    setModalState("modal-one")
  }

  const handleShowModalTwo = () => {
    setModalState("modal-two")
  }

  const handleShowModalThree = (id) => {
     fetch("http://localhost:4000/course/"+id, {
      method: "GET", headers: {
        "token": token, 'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((d) => setStudents(d))
     
    setModalState("modal-three")
  }
  const handleShowModalFour = (id) => {
    setgradeId(id);
    setModalState("modal-four")
  }

  function Handleupdate(e){
    e.preventDefault();
    fetch("http://localhost:4000/course/"+gradeId, {
      method: "PUT", headers: {
        "token": token, 'Accept': 'application/json',
        'Content-Type': 'application/json'
      },body:JSON.stringify({grade:grade.current.value})
    }).then(()=>window.location.reload())
  }
  const handleClose = () => {
    setModalState("close")
  }
  return (
    <div className="shadow-lg main-table" >
      <div className="page-header"> <h1 className="page-title">students</h1>
        </div>

      <table class="table table-white table-striped text-Primary" >
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">course</th>
            <th scope="col">status</th>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>

        {data.map((dataObj, index) => {
            return (
              <tr>
              <th scope="row">{index}</th>
              <td>{dataObj.name}</td>
              <td>{dataObj.status == 1 ? 'active' : 'disactive'}</td>
              <td> 
            <Button class="btn btn-primary ms-2 "  onClick={()=>handleShowModalThree(dataObj.id)}>
              View students
            </Button>
             </td>
            </tr>

            );
          })}
       
        </tbody>
      </table>

     {/*Start Add Modal */}
      <Modal show={modalState === "modal-one"}
        animation={false}
      >
        <ModalHeader style={{"fontSize":"16px","fontWeight":"Bold"}}>Add New Student</ModalHeader>

        <ModalBody>   
        <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email</label>
            <input type="email" class="form-control" id="addEmail" aria-describedby="emailHelp" />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Phone</label>
            <input type="" class="form-control" id="addPhone" />
          </div>

        </form></ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={handleClose}>Close</Button>
          <Button>Save Changes</Button>
        </ModalFooter>
      </Modal>
      {/*End Add Modal */}


   

      
      {/*start view students Modal */}
      <Modal  show={modalState === "modal-three"} animation={false}
      >
        <ModalHeader style={{"fontSize":"16px","fontWeight":"Bold"}}>Students</ModalHeader>

        <ModalBody> 
        <table class="table table-white table-striped text-Primary" >
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">Grades</th>
            
            <td>Actions</td>

          </tr>
        </thead>
        <tbody>

        {students.map((dataObj, index) => {
            return (
              <tr>
              <th scope="row">{index}</th>
              <td>{dataObj.name}</td>
              <td>{dataObj.grade}</td>
              <td> <Button class="btn btn-primary mx-2"  onClick={()=>handleShowModalFour(dataObj.grade_id)}>
              Update
            </Button>
             </td>
            </tr>

            );
          })}

      
        
        </tbody>
      </table>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={handleClose}>Close</Button>
          <Button>Save Changes</Button>
        </ModalFooter>
      </Modal>
      {/*End view courses Modal */}



      {/*start setGrade Modal */}

      <Modal show={modalState === "modal-four"}
        animation={false}
      >
        <ModalHeader style={{"fontSize":"16px","fontWeight":"Bold"}}>Course Name</ModalHeader>

        <ModalBody>   
        <form onSubmit={Handleupdate}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Course Grade</label>
            <input ref={grade}  type="number" class="form-control" id="setGrade"  />
          </div>
          <Button type="submit">Save Changes</Button>


        </form></ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={handleClose}>Close</Button>
        </ModalFooter>
      </Modal>
      {/*End setGrade Modal */}
    </div>
    
  )
}

export default EnrolledStudents;