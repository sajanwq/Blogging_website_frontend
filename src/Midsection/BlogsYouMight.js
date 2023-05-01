import React, { Component } from "react";
import axios from "axios";


class BlogsYouMight extends Component {

    // crating states

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
                localStorage.setItem("Images", res.data.Images)
                window.location.href = "/fullcontent"

            })
            .catch((err) => {

            })
    }



    render() {
        return (

            <div class="row tm-margin-t-big p-5">


                {this.state.BlogsList.map(datas => {
                    return (

                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                            <div class="tm-content-box">
                                <img src={"http://localhost:90/" + datas.Images} alt="Image" class="tm-margin-b-30 img-fluid" />
                                <h4 class="tm-margin-b-20 tm-gold-text">{datas.Title}</h4>
                                <p class="tm-margin-b-20">{datas.Introduction}</p>
                                <a href="#" type="submit" onClick={() => this.shomoreClicked(datas._id)} class="tm-btn text-uppercase">Show More</a>
                            </div>
                        </div>
                    )
                })}


            </div>

        )
    }
}
export default BlogsYouMight