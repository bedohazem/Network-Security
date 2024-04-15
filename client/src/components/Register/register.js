import React , {Component, useRef , useState } from 'react'
import { json } from 'react-router-dom'
 function Register(){
    const [res, setRes] = useState("");

       const userName =useRef()
        const password =useRef()
        const email =useRef()
        const phone =useRef()
        const handleSubmit =(e)=>{
            e.preventDefault();
             fetch("http://localhost:4000/auth/register" , {method:"POST" ,
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              } ,body: JSON.stringify({name:userName.current.value, password:password.current.value ,email:email.current.value,phone:phone.current.value})
            },
             ).then(function(response) {
                    return response.json();
                }).then(function(json) {
                    return json;
                }).then(function(result) {
                  if(result.errors){
                    setRes(result.errors[0].msg)
                  }else{
                    localStorage.setItem("user",JSON.stringify(result));
                    window.location.href('/login');
                  }
                });
    }
        
        
        return (
            <div class="login-page bg-light">
            <div class="container">
                <div class="row">
                    <div class="col-lg-10 offset-lg-1"><h3>Register Now  <img className='logo' src='LMSLogo.png' width="7%"></img></h3>
                        <div class="bg-white shadow rounded">
                            <div class="row">
                                <div class="col-md-6 pe-0">
                                    <div class="form-left h-100 py-5 px-5">
                                        <form action="" class="row g-4" onSubmit={handleSubmit}>
                                        {res != "" ?
                                            <div className="alert alert-info">
                                                {res}
                                            </div> : ''
                                        }
                                                <div class="col-12">
                                                    <label>Username<span class="text-danger">*</span></label>
                                                    <div class="input-group">
                                                        <div class="input-group-text"><i class="bi bi-person-fill"></i></div>
                                                        <input type="text" class="form-control" placeholder="Enter Username" ref={userName}/>
                                                    </div>
                                                </div>
    
                                                <div class="col-12">
                                                    <label>Password<span class="text-danger">*</span></label>
                                                    <div class="input-group">
                                                        <div class="input-group-text"><i class="bi bi-lock-fill"></i></div>
                                                        <input type="text" class="form-control" placeholder="Enter Password" ref={password}/>
                                                    </div>
                                                </div>
    
                                                <div class="col-12">
                                                    <label>Email<span class="text-danger">*</span></label>
                                                    <div class="input-group">
                                                        <div class="input-group-text"><i class="bi bi-envelope-fill"></i></div>
                                                        <input type="text" class="form-control" placeholder="Enter email" ref={email}/>
                                                    </div>
                                                </div>
    
                                                <div class="col-12">
                                                    <label>Phone<span class="text-danger">*</span></label>
                                                    <div class="input-group">
                                                        <div class="input-group-text"><i class="bi bi-phone-fill"></i></div>
                                                        <input type="text" class="form-control" placeholder="Enter Phone number" ref={phone}/>
                                                    </div>
                                                </div>
    
                                               
    
                                                
    
                                                <div class="col-12">
                                                    <button type="submit" class="btn btn-primary px-4 float-end mt-4 w-100">Register</button>
                                                </div>
                                                <div class="col-sm-6" style={{"display":"flex",}}>
                                                 Already have an Account?<a href="/login" class="float-end text-primary">Login</a>
                                                </div>
                                        </form>
                                    </div>
                                </div>
                                <div class="col-md-6 ps-0 d-none d-md-block">
                                    {/* <div class="form-right h-100 bg-primary text-white text-center pt-5"> */}
                                        <img width="80%" src='https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?size=626&ext=jpg&ga=GA1.2.340442350.1679701464&semt=sph'></img>
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        )
       
    }


 export default Register;