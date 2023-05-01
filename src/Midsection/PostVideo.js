import React, { Component } from "react";
import { NavLink } from "react-router-dom"
import axios from "axios";
import { Redirect } from "react-router";
class PostVideo extends Component {

    state = {
        Title: "",
        Description: "",
        UrlLinks: "",
        message: "",
        config: {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
    }


    // creating onchange handler for all inputfields
    PostVideoChangeHandler = (eve) => {
        this.setState({
            [eve.target.name]: eve.target.value
        })
    }


    // posting videos
    VideoPosted = (event) => {
        event.preventDefault();
        const VideoData = {
            Title: this.state.Title,
            Description: this.state.Description,
            UrlLinks: this.state.UrlLinks
        }
        axios.post('http://localhost:90/sportsAndTravel/Videos/Upload', VideoData, this.state.config)
            .then((res) => {
                alert("Uploaded successfully!")
                window.location.href = "/Videos"
            })
            .catch((err) => {
                console.log(err.response.data.message)
                this.setState({
                    message: err.response.data.message,
                })
            })
    }

    render() {
        //  routes  protection for unlogged user(Either Admin or User)
        if (!localStorage.getItem("token")) {
            return <Redirect to="/login" />
        } else if (localStorage.getItem("UserType") != "Admin") {
            return <Redirect to="/" />
        }




        return (
            <div class="container-fluid bg-light ">

                <div class="row d-flex justify-content-center py-5">
                    <div class="col-lg-9 border bg-white">
                        <div class="row d-flex justify-content-center ">
                            <div class="col-lg-8 p-2  d-flex justify-content-center  ">
                                <h3>Post videos</h3>
                            </div>
                        </div>
                        <div class="row  d-flex justify-content-center">
                            <div class="col-lg-8 messege-right p-3 border">
                                <div class="row m-0">
                                    <div class="col-lg-12 bg-dark text-white">
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <h1 class="pt-2 text-light">Videos</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-12 p-0 message-box-input">
                                        <form>
                                            <div class="form-group">
                                                <input type="text" onChange={this.PostVideoChangeHandler} value={this.state.Title} name="Title" class="form-control" id="exampleInputEmail1" placeholder="Footer title" />
                                                <textarea class="form-control" onChange={this.PostVideoChangeHandler} value={this.state.Description} name="Description" id="exampleFormControlTextarea1" rows="2" placeholder="Description" />
                                            </div>
                                        </form>
                                    </div>
                                    {/* messages */}
                                    <span><p className="text-danger text-center">{this.state.message}</p></span>

                                    {/* for uploading videos */}
                                    <div class="col-lg-12   imageuploads mb-4 d-flex justify-content-center ">
                                        <label className="font-weight-bold">Video:</label><input name="UrlLinks" onChange={this.PostVideoChangeHandler} value={this.state.UrlLinks} className="ml-2" type="text" placeholder="Paste it links here.." />

                                    </div>

                                    <div class="co-lg-12 message-box-last-content p-2">
                                        <NavLink to="#" type="submit" class="btn btn-primary btn-sm pl-3 pr-3" onClick={this.VideoPosted}>Post Video</NavLink>
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
export default PostVideo