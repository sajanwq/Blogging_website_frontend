import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-dom"


class Login extends Component {
    state = {
        Email: "",
        Password: "",
        message: "",
        success: ""
    }

    // changehandler function
    LoginChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    //// function for signin button
    getLogged = (event) => {
        event.preventDefault();
        const data = {
            Email: this.state.Email,
            Password: this.state.Password
        }
        axios.post('http://localhost:90/sportsAndTravel/userLogin', data)
            .then((res) => {
                console.log(res.data)
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('id', res.data.userdata.id)
                localStorage.setItem('FullName', res.data.userdata.FullName)
                localStorage.setItem('UserType', res.data.userdata.UserType)
                localStorage.setItem('ProfilePicture', res.data.userdata.ProfilePicture)
                window.location.href = "/"
            })
            .catch((err) => {
                console.log(err.response.data.message)
                this.setState({ message: err.response.data.message })
            })
    }

    render() {

        return (

            <section class="ftco-section bg-secondary">
                <div class="container">

                    <div class="row justify-content-center">
                        <div class="col-md-6 text-center mb-5">
                            <h2 class="heading-section text-white">Login!</h2>
                        </div>
                    </div>


                    <div class="row justify-content-center">
                        <div class="col-md-7 col-lg-5">
                            <div class="wrap">
                                <div class="img loginmages">
                                    <img src="./signupfiles/images/bg-1.jpg"></img>
                                </div>

                                <div class="login-wrap p-4 p-md-5">
                                    <div class="d-flex">
                                        <div class="w-100">
                                            <h3 class="mb-4">Sign In</h3>
                                        </div>



                                        <div class="w-100">
                                            <p class="social-media d-flex justify-content-end">
                                                <a href="#"
                                                    class="social-icon d-flex align-items-center justify-content-center"><span
                                                        class="fa fa-facebook"></span></a>
                                                <a href="#"
                                                    class="social-icon d-flex align-items-center justify-content-center"><span
                                                        class="fa fa-twitter"></span></a>
                                            </p>
                                        </div>




                                    </div>
                                    <form action="#" class="signin-form">

                                        <div class="form-group mt-3">
                                            <input type="text" name="Email" value={this.state.Email} onChange={this.LoginChangeHandler} class="form-control" required />
                                            <label class="form-control-placeholder" for="username">Email</label>
                                        </div>

                                        <div class="form-group">
                                            <input id="password-field" type="password" name="Password" value={this.state.Password} onChange={this.LoginChangeHandler} class="form-control" required />
                                            <label class="form-control-placeholder" for="password">Password</label>
                                            {/* <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password"></span> */}
                                        </div>

                                        {/* messages */}
                                        <span><p className="text-danger text-center">{this.state.message}</p></span>
                                        <div class="form-group">
                                            <button id="signinLoginBtnn" type="submit" class="form-control btn btn-primary rounded submit px-3" onClick={this.getLogged}>SignIn</button>
                                        </div>

                                    </form>

                                    <p class="text-center ">Not a member? <NavLink to="/signup">Sign Up</NavLink></p>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </section>

        )
    }
}
export default Login