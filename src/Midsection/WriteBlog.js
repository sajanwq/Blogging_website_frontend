import React, { Component } from "react";
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";
import axios from "axios";

class WriteBlog extends Component {
    state = {
        Title: "",
        Introduction: "",
        MainContent: "",
        Conclusion: "",
        Images: null,
        Videos: "",
        Date: "",
        AuthorizedID: localStorage.getItem("id"),
        config: {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }


    }

    // creating functions for all inputfields
    changeHandlerFunction = (eve) => {
        this.setState({
            [eve.target.name]: eve.target.value
        })
    }

    //creating on change file handler....
    FileChangeHandler = (eve) => {
        this.setState({
            Images: eve.target.files[0]
        })
    }




    // creating post function
    CreatePost = (event) => {
        event.preventDefault()
        var confirmation = window.confirm("Are you sure?")
        if (confirmation === false) {
            return false
        } else {

            event.preventDefault();

            const UserData = new FormData()
            UserData.append("Title", this.state.Title)
            UserData.append("Introduction", this.state.Introduction)
            UserData.append("MainContent", this.state.MainContent)
            UserData.append("Conclusion", this.state.Conclusion)
            UserData.append("Images", this.state.Images)
            UserData.append("Videos", this.state.Videos)
            UserData.append("Date", this.state.Date)
            UserData.append("AuthorizedID", this.state.AuthorizedID)
            axios.post('http://localhost:90/sportsAndTravel/Blog/CreateBlog', UserData, this.state.config)
                .then((res) => {
                    setTimeout(function () {
                        window.location.href = "/blogs"
                    }, 500);

                })
                .catch((err) => {
                    this.setState({
                        message: err.response.data.message,
                    })
                })
        }


    }






    render() {
        if (!localStorage.getItem("token")) {
            return <Redirect to="/login" />
        }



        return (
            <div class="container-fluid bg-light ">
                <div class="row d-flex justify-content-center py-5">
                    <div class="col-lg-9 border bg-white">
                        <div class="row d-flex justify-content-center ">
                            <div class="col-lg-8 p-2  d-flex justify-content-center  ">
                                <h3>Create Blog</h3>
                            </div>
                        </div>
                        <div class="row  d-flex justify-content-center">
                            <div class="col-lg-8 messege-right p-3 border">
                                <div class="row m-0">
                                    <div class="col-lg-12 bg-dark text-white">
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <h1 class="pt-2 text-light">New Blog</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-12 p-0 message-box-input">
                                        <form>
                                            <div class="form-group">
                                                <input type="text" class="form-control" id="exampleInputEmail1"
                                                    aria-describedby="emailHelp" name="Title" value={this.state.Title} onChange={this.changeHandlerFunction} placeholder="Blog title" />
                                                <textarea class="form-control" name="Introduction" value={this.state.Introduction} onChange={this.changeHandlerFunction} id="exampleFormControlTextarea1" rows="4" placeholder="Introduction" />
                                                <textarea class="form-control" name="MainContent" value={this.state.MainContent} onChange={this.changeHandlerFunction} id="exampleFormControlTextarea1" rows="6" placeholder="Main Content" />
                                                <textarea class="form-control" name="Conclusion" value={this.state.Conclusion} onChange={this.changeHandlerFunction} id="exampleFormControlTextarea1" rows="4" placeholder="Conclusion" />
                                            </div>
                                        </form>

                                        {/* messages */}
                                        <span><p className="text-danger text-center">{this.state.message}</p></span>
                                    </div>

                                    <div class="col-md-12 col-lg-12  DatesTypes mt-3 mb-5 d-flex justify-content-center  ">
                                        <form clas="m" >
                                            <label className="font-weight-bold mr-1" for="birthday ">Date:</label>
                                            <input type="date" id="birthday" name="Date" value={this.state.Date} onChange={this.changeHandlerFunction} />
                                        </form>


                                    </div>

                                    <div class="col-md-12 col-lg-12   imageuploads mb-4 d-flex justify-content-between ">
                                        <div>
                                            <input className="ml-2" type="file" onChange={this.FileChangeHandler} />
                                        </div>
                                       
                                    </div>

                                    <div class="co-lg-12 message-box-last-content p-2">
                                        <NavLink to="#" type="submit" onClick={this.CreatePost} class="btn btn-primary btn-sm pl-3 pr-3">Create</NavLink>
                                        <span class="pull-right">
                                            <NavLink to="/MyBlogs"><i class="fa fa-trash-o" aria-hidden="true"></i></NavLink>
                                        </span>
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
export default WriteBlog