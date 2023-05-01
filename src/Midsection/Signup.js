import React, { Component } from "react";
import axios from "axios";


class Signup extends Component {

    // making states
    state = {
        FullName: "",
        Email: "",
        Password: "",
        message: "",
        success: ""
    }

    // creating functions for all inputfields
    SignupChangeHandler = (eve) => {
        this.setState({
            [eve.target.name]: eve.target.value
        })
    }

    // creating signup function to register
    RegisterUser = (event) => {
        event.preventDefault();
        const UserData = {
            FullName: this.state.FullName,
            Email: this.state.Email,
            Password: this.state.Password
        }
        axios.post('http://localhost:90/sportsAndTravel/signup', UserData)
            .then((res) => {
                this.setState({
                    message: res.data.message,
                    success: res.data.success
                })
                setTimeout(function () {
                    window.location.href = "/login"
                }, 1300);



            })
            .catch((err) => {
                console.log(err.response.data.message)
                this.setState({
                    message: err.response.data.message,
                    success: err.response.data.success
                })
            })

    }

    



    render() {
        if (this.state.success != "false") {
            var mymessage = <span><p className="text-success text-center">{this.state.message}</p></span>
        }

        else {
            var mymessage = <span><p className="text-danger text-center">{this.state.message}</p></span>
        }





        return (
            <>

                <div class="page-content">
                    <div class="form-v6-content">
                        <div class="form-left  imagessignup">
                            <img src="./signupfiles/images/myimage.png" alt="form" />
                        </div>
                        <form class="form-detail" action="#" method="post">
                            <h2>Register Form</h2>
                            <div class="form-row">
                                <input type="text" name="FullName" value={this.state.FullName} onChange={this.SignupChangeHandler} id="full-name" class="input-text" placeholder="Your Name" required />
                            </div>
                            <div class="form-row">
                                <input type="text" name="Email" value={this.state.Email} onChange={this.SignupChangeHandler} id="your-email" class="input-text" placeholder="Email Address" required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}" />
                            </div>
                            <div class="form-row">
                                <input id="pw" type="password" name="Password" value={this.state.Password} onChange={this.SignupChangeHandler} id="password" class="input-text" placeholder="Password" required />
                            </div>
                            <div class="form-row">
                                <input id="cpw" type="password" name="comfirm-password" id="comfirm-password" class="input-text" placeholder="Comfirm Password" required />
                            </div>

                            {/* messages area */}
                            {mymessage}


                            <div class="form-row-last">
                                <input type="submit" name="register" className="register" value="Register" onClick={this.RegisterUser} />
                            </div>
                        </form>
                    </div>
                </div>



            </>
        )
    }
}
export default Signup