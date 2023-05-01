import React, { Component } from "react";
import axios from "axios"
class ViewComment extends Component {
    // making states
    state = {
        CommentList: [],
        config: {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        },
    }


    // function  todisplay the blogs details
    componentDidMount() {
        axios.get("http://localhost:90/sportsAndTravel/Comment/FetchComment")
            .then((res) => {
                console.log(res.data.ProfilePicture)
                this.setState({
                    CommentList: res.data
                })
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    removeComment = (comment_id) => {
        var confirmation = window.confirm("Are you sure?")
        if (confirmation == false) {
            return false
        } else {
            axios.delete("http://localhost:90/sportsAndTravel/Comment/Delete/" + comment_id, this.state.config)
                .then((res) => {
                    if (res.data.success === true) {
                        alert("Deleted sucessfully!")
                        window.location.href = "/fullcontent"
                    }
                }).catch((err) => {


                })

        }




    }



    render() {
        if (localStorage.getItem("id")) {
            if (localStorage.getItem("UserType") === "Admin") {
                {/* iterating comments */ }
                var delcommentButton = this.state.CommentList.map(data => {
                    return (
                        <div class="card p-3">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="user d-flex flex-row align-items-center">
                                    <div class=" col-lg-2 col-md-2 col-xl-3user d-flex align-items-center  align-items-center">
                                        <img src={"http://localhost:90/" + data.UserProfilePicture} width="30" class="user-img rounded-circle mr-2" />
                                    </div>
                                    <span><small class="font-weight-bold text-primary mr-2">{data.UserName}</small> <small class="font-weight-bold">{data.Comment}</small></span>
                                </div>

                            </div>

                            <div class="action d-flex justify-content-between mt-2 align-items-center">
                                <div class="reply px-4">
                                    <small type="button" className="text-danger" onClick={() => this.removeComment(data._id)}>Remove</small>
                                </div>
                            </div>
                        </div>
                    )
                })
            } else if (localStorage.getItem("UserType") === "User") {
                {/* iterating comments */ }
                var delcommentButton = this.state.CommentList.map(data => {
                    return (
                        <div class="card p-3">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="user d-flex flex-row align-items-center">
                                    <div class=" col-lg-2 col-md-2 col-xl-3user d-flex align-items-center  align-items-center">
                                        <img src={"http://localhost:90/" + data.UserProfilePicture} width="30" class="user-img rounded-circle mr-2" />
                                    </div>
                                    <span><small class="font-weight-bold text-primary mr-2">{data.UserName}</small> <small class="font-weight-bold">{data.Comment}</small></span>
                                </div>

                            </div>

                            <div class="action d-flex justify-content-between mt-2 align-items-center">


                            </div>
                        </div>
                    )
                })
            }

        }

        else {
            {/* iterating comments */ }
            var delcommentButton = this.state.CommentList.map(data => {
                return (
                    <div class="card p-3">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="user d-flex flex-row align-items-center">
                                <div class=" col-lg-2 col-md-2 col-xl-3user d-flex align-items-center  align-items-center">
                                    <img src={"http://localhost:90/" + data.UserProfilePicture} width="30" class="user-img rounded-circle mr-2" />
                                </div>
                                <span><small class="font-weight-bold text-primary mr-2">{data.UserName}</small> <small class="font-weight-bold">{data.Comment}</small></span>
                            </div>

                        </div>

                        <div class="action d-flex justify-content-between mt-2 align-items-center">


                        </div>
                    </div>
                )
            })

        }




        return (
            <div class="container mt-5 mb-5">
                <div class="row d-flex justify-content-center">
                    <div class="col-md-8">
                        <div class="headings d-flex justify-content-between align-items-center mb-3">
                            <h5>View all the comments</h5>
                        </div>


                        {/* valling the variable */}
                        {delcommentButton}


                    </div>
                </div>
            </div>
        )
    }
}
export default ViewComment