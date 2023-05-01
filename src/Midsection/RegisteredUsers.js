import axios from "axios";
import React, { Component } from "react";
import { Redirect } from "react-router";

class RegisteredUsers extends Component {

    // creating states
    state = {
        Userlist: [],
        config: {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }


    }


    // function from admin registered  view page to get all the registered users 
    componentDidMount() {
        axios.get("http://localhost:90/sportsAndTravel/registeredUsers", this.state.config)
            .then((res) => {
                console.log(res.data)
                this.setState({
                    Userlist: res.data
                })
            })
            .catch((err) => {
                console.log(err.response)
            })
    }


    // function for delect buttons 
    ClickDeleteButton = (user_ID) => {
        var confirmation = window.confirm("Are you sure?")
        if (confirmation == false) {
            return false
        } else {
            axios.delete("http://localhost:90/sportsAndTravel/delete/userdata/" + user_ID, this.state.config)
                .then((res) => {
                    window.location.href = "/ViewUsers"
                })
                .catch((err) => {
                    console.log(err.response)
                })

        }

    }


    render() {

        //  routes  protection for unlogged user(Either Admin or User)
        if (!localStorage.getItem("token")) {
            return <Redirect to="/login" />
        } else if (localStorage.getItem("UserType") != "Admin") {
            return <Redirect to="/" />
        }


        return (
            <div class="container mt-5 mb-5 bg-light">
                <div class="row d-flex justify-content-center">
                    <div class="col-md-8">
                        <div class="headings d-flex justify-content-center align-items-center mb-3 p-3">
                            <h4 className="text-center text-warning font-weight-bold">Registered Users</h4>
                        </div>


                        {/* main data cards */}
                        {this.state.Userlist.map(user => {
                            return (
                                <div class="card p-3">
                                    <div>
                                        <div className="col-md-3 col-lg-3">
                                            <div class="d-flex  align-items-center mt-5 mb-5">
                                                <div class="user">
                                                    <img src={"http://localhost:90/" + user.ProfilePicture} width="30" class="user-img rounded-circle mr-2" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-lg-3">
                                            <h5 class="font-weight-bold border-bottom m-1 text-secondary">Full Name</h5>
                                            <h5 class="text-info pt-4 mt-5 ">{user.FullName}</h5>
                                        </div>
                                        <div className="col-md-3 col-lg-3">
                                            <h5 class="font-weight-bold border-bottom m-1 text-secondary">Email</h5>
                                            <h5 class="text-info pt-4 mt-5 ">{user.Email}</h5>
                                        </div>
                                        <div className="col-md-3 col-lg-3">
                                            <h5 class="font-weight-bold border-bottom m-1 text-secondary">Contact</h5>
                                            <h5 class="text-info pt-4 mt-5 ">{user.PhoneNumber}</h5>
                                        </div>
                                    </div>
                                    <div class="action d-flex justify-content-between mt-2 align-items-center">
                                        <div class="reply px-4">

                                            <button className=" btn btn-danger" onClick={() => { this.ClickDeleteButton(user._id) }}>Delete</button>
                                        </div>
                                        <div class="icons align-items-center"> <i class="fa fa-check-circle-o check-icon"></i> </div>
                                    </div>
                                </div>

                            )


                        })}





                    </div>
                </div>
            </div>
        )
    }
}
export default RegisteredUsers