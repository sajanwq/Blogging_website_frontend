import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

class UpdateBlogs extends Component {

    state = {
        Title: localStorage.getItem("Title"),
        Introduction: localStorage.getItem("Introduction"),
        MainContent: localStorage.getItem("MainContent"),  
        Conclusion: localStorage.getItem("Conclusion"),
        Images: null,
        Videos: "",
        message: "",


        config: {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }


    }



    // creating functions for all inputfields
    cahngeHandlerFunction = (eve) => {
        this.setState({
            [eve.target.name]: eve.target.value
        })
    }


    // creating functions for file handler
    FileChangeHandler = (eve) => {
        this.setState({
            Images: eve.target.files[0]
        })
    }



    //// function updating blogs
    getSubmittedUpdated = (BlogId) => {
        window.confirm("Are you sure")
        const data = new FormData()
        data.append("Title", this.state.Title)
        data.append("Introduction", this.state.Introduction)
        data.append("MainContent", this.state.MainContent)
        data.append("Conclusion", this.state.Conclusion)
        data.append("Images", this.state.Images)

        axios.put('http://localhost:90/sportsAndTravel/Blog/updateBlog/' + BlogId, data, this.state.config)
            .then((res) => {
                alert("Updated successfully!!")
                window.location.href="MyBlogs"
            })
            .catch((err) => {
                console.log(err.response.data.message)
                this.setState({ message: err.response.data.message })
            })
    }



    render() {
        return (
            <div class="container-fluid bg-light ">
                <div class="row d-flex justify-content-center py-5">
                    <div class="col-lg-9 border bg-white">
                        <div class="row d-flex justify-content-center ">
                            <div class="col-lg-8 p-2  d-flex justify-content-center  ">
                                <h3>Update Blog</h3>
                            </div>
                        </div>
                        <div class="row  d-flex justify-content-center">
                            <div class="col-lg-8 messege-right p-3 border">
                                <div class="row m-0">
                                    <div class="col-lg-12 bg-dark text-white">
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <h1 class="pt-2 text-light">Update </h1>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-lg-12 p-0 message-box-input">
                                        <form>
                                            <div class="form-group">
                                                <input type="text" class="form-control" id="exampleInputEmail1"
                                                    aria-describedby="emailHelp" name="Title" value={this.state.Title} onChange={this.cahngeHandlerFunction} placeholder="Blog title" />
                                                <textarea class="form-control" name="Introduction" value={this.state.Introduction} onChange={this.cahngeHandlerFunction} id="exampleFormControlTextarea1" rows="4" placeholder="Introduction" />
                                                <textarea class="form-control" name="MainContent" value={this.state.MainContent} onChange={this.cahngeHandlerFunction} id="exampleFormControlTextarea1" rows="6" placeholder="Main Content" />
                                                <textarea class="form-control" name="Conclusion" value={this.state.Conclusion} onChange={this.cahngeHandlerFunction} id="exampleFormControlTextarea1" rows="4" placeholder="Conclusion" />
                                            </div>
                                        </form>

                                        <span><p className="text-danger text-center">{this.state.message}</p></span>
                                    </div>


                                    <div class="col-md-12 col-lg-12   imageuploads mb-4 d-flex justify-content-between ">
                                        <div>
                                            <label className="font-weight-bold">Image:</label>
                                            <input className="ml-2" type="File" onChange={this.FileChangeHandler} />
                                        </div>
                                        <div>
                                            <label className="font-weight-bold">Video:</label>
                                            <input className="ml-2" type="text" placeholder="Paste it links here.." />
                                        </div>


                                    </div>

                                    <div class="co-lg-12 message-box-last-content p-2">
                                        <NavLink to="#" type="submit" onClick={() => this.getSubmittedUpdated(localStorage.getItem("id_Blog"))} class="btn btn-primary btn-sm pl-3 pr-3">Update</NavLink>
                                        <span class="pull-right">
                                            <NavLink to="/MyBlogs"><i class="fa fa-trash-o" aria-hidden="true"></i>    </NavLink>
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
export default UpdateBlogs