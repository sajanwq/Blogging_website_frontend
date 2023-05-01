import React, { Component } from "react";
import { NavLink } from "react-router-dom"
import { Redirect } from "react-router";
import axios from "axios";

class UpdatFooter extends Component {
    state = {
        data_id: localStorage.getItem("FooterID"),
        Title: "",
        Description: "",
        Email: "",
        Images: null,
        message: "",
        config: {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }


    }

    // creating onchange handler for all inputfields
    updateFooterChangeHandler = (eve) => {
        this.setState({
            [eve.target.name]: eve.target.value
        })
    }

    //creating on change file handler....
    changeFileHandler = (eve) => {
        this.setState({
            Images: eve.target.files[0]
        })
    }


    // function from admin to display the footer details
    componentDidMount() {
        axios.get("http://localhost:90/sportsAndTravel/Footer/single/fethData/" + this.state.data_id, this.state.config)
            .then((res) => {
                this.setState({
                    Title: res.data.Title,
                    Description: res.data.Description,
                    Email: res.data.Email,
                    Images: res.data.Images,
                })
            })
            .catch((err) => {
                console.log(err.response)
            })
    }



    //// function  to update the footer details
    FooterUpdated = (footerID) => {
        var confirmation = window.confirm("Are you sure?")
        if (confirmation == false) {
            return false
        } else {

            const FooterData = new FormData()
            FooterData.append("Title", this.state.Title)
            FooterData.append("Email", this.state.Email)
            FooterData.append("Description", this.state.Description)
            FooterData.append("Images", this.state.Images)
            axios.put('http://localhost:90/sportsAndTravel/Footer/update/' + footerID, FooterData, this.state.config)
                .then((res) => {
                    if (res.data.success === true) {
                        window.location.href = "/"
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
        } else if (localStorage.getItem("UserType") != "Admin") {
            return <Redirect to="/" />
        }

        return (


            <div class="container-fluid bg-light ">

                <div class="row d-flex justify-content-center py-5">
                    <div class="col-lg-9 border bg-white">
                        <div class="row d-flex justify-content-center ">
                            <div class="col-lg-8 p-2  d-flex justify-content-center  ">
                                <h3>Update Footer Details</h3>
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
                                                <input type="text" onChange={this.updateFooterChangeHandler} value={this.state.Title} name="Title" class="form-control" id="exampleInputEmail1" placeholder="Footer title" />
                                                <input type="email" onChange={this.updateFooterChangeHandler} value={this.state.Email} name="Email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" />
                                                <textarea class="form-control" onChange={this.updateFooterChangeHandler} value={this.state.Description} name="Description" id="exampleFormControlTextarea1" rows="2" placeholder="Description" />
                                            </div>
                                        </form>
                                    </div>
                                    {/* messages */}
                                    <span><p className="text-danger text-center">{this.state.message}</p></span>

                                    {/* for uploading images */}
                                    <div class="col-lg-12   imageuploads mb-4 d-flex justify-content-center ">
                                        <label className="font-weight-bold text-primary">Image:</label>   <input className="ml-2" type="file" onChange={this.changeFileHandler} />
                                    </div>

                                    <div class="co-lg-12 message-box-last-content p-2">
                                        <NavLink to="#" type="submit" class="btn btn-primary btn-sm pl-3 pr-3" onClick={() => this.FooterUpdated(localStorage.getItem("FooterID"))}>Update details</NavLink>
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
export default UpdatFooter