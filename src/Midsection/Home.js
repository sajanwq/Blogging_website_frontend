import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import Image from "./Image";
import axios from "axios";
class Home extends Component {

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
                <Image></Image>
                <section class="tm-section">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-xs-center">
                                <h2 class="tm-gold-text tm-title">Introduction</h2>
                                <p class="tm-subtitle">Welcomes tho the travel and sports blogging website</p>
                            </div>
                        </div>

                        {/* making main mainstory cards */}
                        {/* mappping or iterating  */}
                        {this.state.BlogsList.map(datas => {
                            return (
                                <div class="row m-3  tm-margin-t-big  border border-light">
                                    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-5">
                                        <div class="tm-2-cl-left">
                                            <img src={"http://localhost:90/" + datas.Images}alt="Image" class="img-fluid" />
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-7">
                                        <h2 class="tm-gold-text tm-title">{datas.Title}</h2>
                                        <p>{datas.Introduction}</p>

                                        <div class="d-flex justify-content-end">
                                            <NavLink to="/blogs" onClick={() => this.shomoreClicked(datas._id)} class="tm-btn text-uppercase">Read More</NavLink>
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
export default Home