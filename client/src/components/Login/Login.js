import React, { Component, useRef, useState } from 'react'
function Login() {
    const [res, setRes] = useState("");
  
    const email = useRef()
    const password = useRef()
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:4000/auth/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, body: JSON.stringify({ email: email.current.value, password: password.current.value })
        },
        ).then(function (response) {
            return response.json();
        }).then(function (json) {
            return json;
        }).then(function (result) {
            if (result.errors) {
                setRes(result.errors[0].msg)
            } else {
             localStorage.setItem("user",JSON.stringify(result));
             if(result.role == 1)
             window.location.href = '/courses';
             else if(result.role == 2)
             window.location.href = '/enrolledStudents';
             else if(result.role == 3)
             window.location.href = '/registeredCources';

            }
        })
    }


    return (
        <div class="login-page bg-light">
            <div class="container">
                <div class="row">
                    <div class="col-lg-10 offset-lg-1">
                        <h3 class="mb-3 text-primary">Login Now  <img className='logo' src='LMSLogo.png' width="7%"></img></h3>
                        <div class="bg-white shadow rounded">
                            <div class="row">
                                <div class="col-md-6 pe-0">
                                    <div class="form-left h-100 py-5 px-5">
                                        {res != "" ?
                                            <div className="alert alert-info">
                                                {res}
                                            </div> : ''
                                        }

                                        <form action="" class="row g-4" onSubmit={handleSubmit}>
                                            <div class="col-12">
                                                <label>email<span class="text-danger">*</span></label>
                                                <div class="input-group">
                                                    <div class="input-group-text"><i class="bi bi-person-fill"></i></div>
                                                    <input type="text" class="form-control" placeholder="Enter Username" ref={email} />
                                                </div>
                                            </div>

                                            <div class="col-12">
                                                <label>Password<span class="text-danger">*</span></label>
                                                <div class="input-group">
                                                    <div class="input-group-text"><i class="bi bi-lock-fill"></i></div>
                                                    <input type="password" class="form-control" placeholder="Enter Password" ref={password} />
                                                </div>
                                            </div>

                                            <div class="col-sm-6">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="inlineFormCheck" />
                                                    <label class="form-check-label" for="inlineFormCheck">Remember me</label>
                                                </div>
                                            </div>

                                            <div class="col-sm-6">
                                                <a href="#" class="float-end text-primary">Forgot Password?</a>
                                            </div>

                                            <div class="col-12">
                                                <button type="submit" class="btn btn-primary px-4 float-end mt-4 w-100">login</button>
                                            </div>
                                            <div class="col-5" className='register'>
                                                <h5>Did not have Account? <a href="/register" class="float-end text-primary">Register</a></h5>

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


export default Login;