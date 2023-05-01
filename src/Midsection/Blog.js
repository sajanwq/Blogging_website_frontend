import React, { Component } from "react";
import BlogsYouMight from "./BlogsYouMight";
import { NavLink } from "react-router-dom";
import axios from "axios";

class Blog extends Component {

    state = {
        BlogsList: []
    }




    // function  todisplay the blogs details
    componentDidMount() {
        axios.get("http://localhost:90/sportsAndTravel/Blog/fetchData")
            .then((res) => {
                this.setState({
                    BlogsList: res.data
                })
            })
            .catch((err) => {
                console.log(err.response)
            })
    }



// making functions for show more
    shomoreClicked = (blog_Id) => {
        axios.get("http://localhost:90/sportsAndTravel/Blog/getFullData/" + blog_Id)
            .then((res) => {
                console.log(res.data)
                localStorage.setItem("Date", res.data.Date)
                localStorage.setItem("Title", res.data.Title)
                localStorage.setItem("Introduction", res.data.Introduction)
                localStorage.setItem("MainContent", res.data.MainContent)
                localStorage.setItem("BlogImages", res.data.Images)
        
                window.location.href = "/fullcontent"

            })
            .catch((err) => {


            })


    }












    render() {
        return (
            <>
                <div class="tm-blog-img-container">

                </div>
                <section class="tm-section">
                    <div class="container-fluid">
                        <div class="blog-navbar d-flex justify-content-center p-4">
                            <h1 className="text-muted font-weight-bold"> Blogs</h1>

                        </div>

                        {/* making main mainstory cards */}
                        {/* mappping or iterating  */}
                        {this.state.BlogsList.map(datas => {

                            return (
                                <div class="row m-3  tm-margin-t-big  border border-light">
                                    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-5">
                                        <div class="tm-2-cl-left">
                                            <img src={"http://localhost:90/" + datas.Images} alt="Image" class="img-fluid" />
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-7">
                                        <h2 class="tm-gold-text tm-title">{datas.Title}</h2>
                                        <p className="mb-5">{datas.Introduction}</p>
                                        <div class="d-flex justify-content-end mt-5">
                                            <NavLink to="#" type="submit" onClick={() => this.shomoreClicked(datas._id)} class="tm-btn text-uppercase">Read More</NavLink>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}



                    </div>
                </section>

            </>
        )
    }
}
export default Blog