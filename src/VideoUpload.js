import React, { Component } from "react";
import { NavLink } from "react-router-dom"
import axios from "axios";
import { Redirect } from "react-router";


class VideoUpload extends Component {

    state = {
        VideoId: localStorage.getItem("VideoId"),
        Title: localStorage.getItem("VideoTitle"),
        Description: localStorage.getItem("Description"),
        message: "",
        config: {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }


    }


    // creating onchange handler for all inputfields
    updateVideoChangeHandler = (eve) => {
        this.setState({
            [eve.target.name]: eve.target.value
        })
    }

    //// function  to update the video details
    VideoUpdated = () => {
        var confirmation = window.confirm("Are you sure?")
        if (confirmation === false) {
            return false
        } else {

            const FooterData = {
                Title: this.state.Title,
                Description: this.state.Description,
            }
            axios.put('http://localhost:90/sportsAndTravel/Videos/update/' + this.state.VideoId, FooterData, this.state.config)
                .then((res) => {
                    if (res.data.success === true) {
                        window.location.href = "/Videos"
                    }

                })
                .catch((err) => {
                    console.log(err.response.data.message)
                    this.setState({ message: err.response.data.message })
                })
        }

    }

    render() {

        //  routes  protection for unlogged user(Either Admin or User)
        if (!localStorage.getItem("token")) {
            return <Redirect to="/login" />
        } else if (localStorage.getItem("UserType") !== "Admin") {
            return <Redirect to="/" />
        }


        return (
            <div class="container-fluid bg-light ">

                <div class="row d-flex justify-content-center py-5">
                    <div class="col-lg-9 border bg-white">
                        <div class="row d-flex justify-content-center ">
                            <div class="col-lg-8 p-2  d-flex justify-content-center  ">
                                <h3>Update Videos Details</h3>
                            </div>
                        </div>
                        <div class="row  d-flex justify-content-center">
                            <div class="col-lg-8 messege-right p-3 border">
                                <div class="row m-0">
                                    <div class="col-lg-12 bg-dark text-white">
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <h1 class="pt-2 text-light">Details</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-12 p-0 message-box-input">
                                        <form>
                                            <div class="form-group">
                                                <input type="text" onChange={this.updateVideoChangeHandler} value={this.state.Title} name="Title" class="form-control" id="exampleInputEmail1" placeholder="Footer title" />
                                                <textarea class="form-control" onChange={this.updateVideoChangeHandler} value={this.state.Description} name="Description" id="exampleFormControlTextarea1" rows="2" placeholder="Description" />
                                            </div>
                                        </form>
                                    </div>
                                    {/* messages */}
                                    <span><p className="text-danger text-center">{this.state.message}</p></span>
                                    <div class="co-lg-12 message-box-last-content p-2">
                                        <NavLink to="#" type="submit" class="btn btn-primary btn-sm pl-3 pr-3" onClick={this.VideoUpdated}>Update details</NavLink>
                                        <NavLink to="/"><span class="pull-right"><i class="fa fa-trash-o" aria-hidden="true"></i></span></NavLink>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default VideoUpload