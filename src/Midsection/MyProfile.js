
import BaseComponent from "bootstrap/js/dist/base-component";
import React, { Component, useState } from "react";
import Modal from "react-modal";
import { Redirect } from "react-router";
import axios from "axios"
Modal.setAppElement("#root")



class MyProfile extends Component {

    state = {
        id: "",
        FullName: "",
        Email: "",
        PhoneNumber: "",
        ProfilePicture: null,
        value: false,
        message: "",
        config: {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        },

    }


    // creating functions for all inputfields
    cahngeHandlerFunction = (eve) => {
        this.setState({
            [eve.target.name]: eve.target.value
        })
    }
    //creating on change file handler....
    changeFileHandler = (eve) => {
        this.setState({
            ProfilePicture: eve.target.files[0]
        })
    }



    // creating function of editprofile button modal
    EventEditButton = () => {
        this.setState({ value: true })
    }



    //  creating function for event cencel button modal
    EventCancelButton = () => {
        this.setState({ value: false })
        window.location = "/Myprofile"
    }





    // function from admin my profile view page to get all the registered users 
    componentDidMount() {
        axios.get("http://localhost:90/sportsAndTravel/profile/user/" + localStorage.getItem("id"), this.state.config)
            .then((res) => {
                this.setState({
                    id: res.data._id,
                    FullName: res.data.FullName,
                    Email: res.data.Email,
                    PhoneNumber: res.data.PhoneNumber,
                    ProfilePicture: res.data.ProfilePicture,
                })
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }



    // function for  profile delete buttons 
    deleteButtonClicked = (user_ID) => {
        var confirmation = window.confirm("Are you sure?")
        if (confirmation == false) {
            return false
        } else {
            axios.delete("http://localhost:90/sportsAndTravel/delete/myProfile/" + user_ID, this.state.config)
                .then((res) => {
                    alert(res.data.message + "!")
                    localStorage.clear();
                    window.location.href = "/"

                })
                .catch((err) => {
                    console.log(err.response.data.message)
                })
        }

    }



    //// function for submit button modal
    getSubmittedUpdated = (userId) => {
        window.confirm("Are you sure")
        const data = new FormData()
        data.append("FullName", this.state.FullName)
        data.append("Email", this.state.Email)
        data.append("PhoneNumber", this.state.PhoneNumber)
        data.append("ProfilePicture", this.state.ProfilePicture)


        axios.put('http://localhost:90/sportsAndTravel/update/userdata/' + userId, data, this.state.config)
            .then((res) => {
                window.location.href = "/Myprofile"


            })
            .catch((err) => {
                console.log(err.response.data.message)
                this.setState({ message: err.response.data.message })
            })
    }





    render() {




        if (!localStorage.getItem("token")) {
            return <Redirect to="/login" />
        }
        else if (localStorage.getItem("UserType") != "User") {
            var ActionButtons =
                <>
                    <div class="updatebutton">
                        <button name="btnupdate" onClick={() => this.EventEditButton(this.state.value)} className=" btn btn-success mr-auto"  >Edit Profile</button>
                    </div>

                </>
        } else {

            var ActionButtons =
                <>
                    <div class="updatebutton">
                        <button name="btnupdate" onClick={() => this.EventEditButton(this.state.value)} className=" btn btn-success mr-auto"  >Edit Profile</button>
                    </div>
                    <div class="deletebutton ml-5">
                        <button name="btndelete" onClick={() => this.deleteButtonClicked(this.state.id)} className=" btn btn-danger mr-auto"  > Delete Profile</button>
                    </div>
                </>




        }






        return (

            <div class="container mt-5 mb-5 bg-light">
                <div class="row d-flex justify-content-center">
                    <div class="col-md-8">
                        <div class="headings d-flex justify-content-center align-items-center mb-3 p-3">
                            <h4 className="text-center text-warning font-weight-bold">User Profile</h4>
                        </div>


                        <div class="card p-3">
                            <div>
                                <div className="col-md-3 col-lg-3">
                                    <div class="d-flex  align-items-center mt-5 mb-5">
                                        <div class="user px-4">
                                            <div>
                                            <img src={"http://localhost:90/" + this.state.ProfilePicture} alt="Noimage" width="30" class="user-img rounded-circle mr-2"  />

                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-lg-3">
                                    <h5 class="font-weight-bold border-bottom m-1 text-secondary">Full Name</h5>
                                    <h5 class="text-info pt-4 mt-5 ">{this.state.FullName}</h5>
                                </div>
                                <div className="col-md-3 col-lg-3">
                                    <h5 class="font-weight-bold border-bottom m-1 text-secondary">Email</h5>
                                    <h5 class="text-info pt-4 mt-5 ">{this.state.Email}</h5>
                                </div>
                                <div className="col-md-3 col-lg-3">
                                    <h5 class="font-weight-bold border-bottom m-1 text-secondary">Contact</h5>
                                    <h5 class="text-info pt-4 mt-5 ">{this.state.PhoneNumber}</h5>
                                </div>
                            </div>
                            <div class="action d-flex mt-2 justify-content-center">
                                {ActionButtons}



                                <Modal
                                    isOpen={this.state.value}
                                    onRequestClose={this.state.value}>

                                    <div class="container">
                                        <div class="row height d-flex justify-content-center align-items-center">
                                            <div class="col-md-8">
                                                <div class="col-md-12 col-lg-12 d-flex justify-content-center my-3">
                                                    <h3 className="text-secondary font-weight-bold" >Update Your Details</h3>
                                                </div>
                                                <div class="card py-4">

                                                    <div class="row mt-1 g-2 d-flex justify-content-center">
                                                        <div class="col-md-6">
                                                            <div class="inputs px-4"> <span class="text-uppercase">Client Name</span> <input type="text" class="form-control" name="FullName" onChange={this.cahngeHandlerFunction} value={this.state.FullName} /> </div>
                                                        </div>

                                                    </div>

                                                    <div class="row mt-3 g-2">
                                                        <div class="col-md-6">
                                                            <div class="inputs px-4"> <span class="text-uppercase">Email</span> <input type="text" class="form-control" name="Email" onChange={this.cahngeHandlerFunction} value={this.state.Email} /> </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="inputs px-4"> <span class="text-uppercase">Phone Number</span> <input type="" class="form-control" name="PhoneNumber" onChange={this.cahngeHandlerFunction} value={this.state.PhoneNumber} /> </div>
                                                        </div>
                                                    </div>

                                                    <div class="mt-3 px-4"> <span class="text-uppercase name">Profile Picture</span>
                                                        <div class="d-flex flex-row align-items-center mt-2">
                                                            <div className="col-lg-2">
                                                                <img src="https://i.imgur.com/aCwpF7V.jpg" width="10" height="10" class="rounded" />
                                                            </div>
                                                            {/* profile picture */}
                                                            <div class="ml-3">
                                                                <input type="file" name="ProfiePicture" onChange={this.changeFileHandler} ></input>
                                                            </div>
                                                        </div>

                                                        {/* messages */}
                                                        <span><p className="text-danger text-center">{this.state.message}</p></span>


                                                    </div>
                                                    <div class="row d-flex justify-content-end ">
                                                        <div class="col-md-2 col-lg-2 col-xl-2 ">
                                                            <button className="btn btn-success" name="submit" onClick={() => this.getSubmittedUpdated(this.state.id)}>Submit</button>
                                                        </div>
                                                        <div class="col-md-2 col-lg-2 col-xl-2 ">
                                                            <button className="btn btn-danger" name="cancel" onClick={this.EventCancelButton} >cancel</button>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                </Modal>












                            </div>

                        </div>

                    </div>
                </div>


            </div>

        )
    }
}
export default MyProfile