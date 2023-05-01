import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios"
class Videos extends Component {

    state = {
        VideoData: [],
        config: {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
    }


    // function from admin to display the footer details
    componentDidMount() {
        axios.get("http://localhost:90/sportsAndTravel/Videos/FetchVideo")
            .then((res) => {
                this.setState({
                    VideoData: res.data
                })
            })
            .catch((err) => {
                console.log(err.response)
            })
    }


    // making functions for update
    updateClicked = (Video_Id) => {
        axios.get("http://localhost:90/sportsAndTravel/Videos/Fetch/Individual/Video/" + Video_Id, this.state.config)
            .then((res) => {
                console.log(res.data)
                localStorage.setItem("VideoId", res.data._id)
                localStorage.setItem("VideoTitle", res.data.Title)
                localStorage.setItem("VideoDescription", res.data.Description)
                localStorage.setItem("UrlLinks", res.data.UrlLinks)
                window.location.href = "/VideoUpload"
            })
            .catch((err) => {


            })


    }


    // function for delete buttons 
    ClickDeleteButton = (Video_Id) => {
        var confirmation = window.confirm("Are you sure?")
        if (confirmation == false) {
            return false
        } else {
            axios.delete("http://localhost:90/sportsAndTravel/Videos/delete/" + Video_Id, this.state.config)
                .then((res) => {
                    window.location.href = "/Videos"
                })
                .catch((err) => {
                    console.log(err.response)
                })

        }

    }

    render() {
        if (localStorage.getItem("token")) {
            if (localStorage.getItem("UserType") === "Admin") {
                var loopdata = this.state.VideoData.map(datas => {
                    return (
                        <div class="col-md-6 col-lg-3 col-xl-4">
                            <div className="BlogsInfoOption ">
                                <li class="nav-item dropdown">
                                    <NavLink class=" dropdown-toggle  BlogMoreOption" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                    </NavLink>
                                    <div class="dropdown-menu mycreatedblogMoreOption" aria-labelledby="navbarDropdown">
                                        <NavLink to="#" type="submit" class="dropProfile dropdown-item" onClick={() => { this.updateClicked(datas._id) }} ><i class="far fa-edit mr-1"></i>update</NavLink>
                                        <div class="dropdown-divider"></div>
                                        <NavLink to="#" onClick={() => { this.ClickDeleteButton(datas._id) }} class="dropUsers dropdown-item"><i class="far fa-trash-alt mr-1"></i>delete</NavLink>
                                    </div>
                                </li>
                            </div>
                            <div class="my">
                                <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/pWahNIMRxR0" fallow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>
                                <div class="card-body">
                                    <h5 class="card-title">{datas.Title}</h5>
                                    <p class="card-text">{datas.Description}</p>
                                </div>
                            </div>
                        </div>
                    )
                })

            } else if (localStorage.getItem("UserType") === "User") {

                var loopdata = this.state.VideoData.map(datas => {
                    return (
                        <div class="col-md-6 col-lg-3 col-xl-4">
                            <div class="my">
                                <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/pWahNIMRxR0" fallow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>
                                <div class="card-body">
                                    <h5 class="card-title">{datas.Title}</h5>
                                    <p class="card-text">{datas.Description}</p>
                                </div>
                            </div>
                        </div>
                    )
                })

            }

        } else {

            var loopdata = this.state.VideoData.map(datas => {
                return (
                    <div class="col-md-6 col-lg-3 col-xl-4">
                        <div class="my">
                            <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/pWahNIMRxR0" fallow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>
                            <div class="card-body">
                                <h5 class="card-title">{datas.Title}</h5>
                                <p class="card-text">{datas.Description}</p>
                            </div>
                        </div>
                    </div>
                )
            })
        }

        return (
            <div class="container-fluid bg-light">
                <div class="row MainScreenVideos p-3 mb-3  d-flex justify-content-center">
                    <h1 class="text-center  font-weight-bold text-secondary">Videos</h1>
                </div>
                <div class="row mb-3 mt-2">
                    <div class="morevideos border-2 p-3">

                        {/* calling iterated data here*/}

                        {loopdata}    {/* iterated data is stored in this variable above*/}
                    </div>

                </div>

            </div>

        )
    }
}
export default Videos