import react from "react";
import { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";



class CommentBox extends Component {
    state = {
        Comment: "",
        Rating: "",
        AuthorizedID: localStorage.getItem("id"),
        UserName: localStorage.getItem("FullName"),
        UserProfilePicture: localStorage.getItem("ProfilePicture"),
        message: "",
        config: {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }



    }


    // creating change hsndeler function for fields
    CommentChangeHandler = (eve) => {
        this.setState({
            [eve.target.name]: eve.target.value
        })
    }


    // posting comments
    PostNewComment = (event) => {
        event.preventDefault();
        if (!localStorage.getItem("token")) {
            return window.location.href = "/login"
        }

        var confirmation = window.confirm("Are you sure?")
        if (confirmation == false) {
            return false
        } else {
            const CommentData = {
                Rating: this.state.Rating,
                Comment: this.state.Comment,
                AuthorizedID: this.state.AuthorizedID,
                UserName: this.state.UserName,
                UserProfilePicture: this.state.UserProfilePicture,
            }
            axios.post('http://localhost:90/sportsAndTravel/Comment/CreateComment', CommentData, this.state.config)
                .then((res) => {
                    setTimeout(function () {
                        window.location.href = "/fullcontent"
                    }, 500);
                })
                .catch((err) => {
                    console.log(err.response.data.message)
                    this.setState({
                        message: err.response.data.message,
                    })
                })
        }


    }


    ClearFields = () => {
        document.getElementById("commentfield").value = "";

    }










    render() {

        return (
            <>
                <div class="card w-50">

                    <div class="row">
                        <div class="col-2 d-flex align-items-start ">
                            <div class=" d-flex align-items-center ">
                                <img src={"http://localhost:90/" + localStorage.getItem("FooterImages")} width="70" class="rounded-circle mt-2" />
                            </div>
                        </div>
                        <div class="col-10">
                            <div class="comment-box ml-2">
                                <h4>Add a comment</h4>
                            </div>


                            <div class="comment-area"> <textarea id="commentfield" name="Comment" value={this.state.Comment} onChange={this.CommentChangeHandler} class="form-control" placeholder="what is your view?" rows="4"></textarea> </div>
                            {/* messages */}
                            <span><p className="text-danger text-center">{this.state.message}</p></span>
                            <div class="comment-btns mt-2">
                                <div class="row">
                                    <div class="col-6">
                                        <div class="pull-left"><button className="btn btn-danger btn-sm" onClick={this.ClearFields}>Cancel </button></div>
                                    </div>
                                    <div class="col-6 d-flex justify-content-end">
                                        <div class="pull-right"> <button onClick={this.PostNewComment} class="btn btn-success send btn-sm">Send <i class="fa fa-long-arrow-right ml-1"></i></button> </div>
                                    </div>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            </>
        )
    }
}
export default CommentBox