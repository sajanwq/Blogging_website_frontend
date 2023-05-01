import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

class Footer extends Component {
    state = {
        FooterData: []
    }


    // function from admin to display the footer details
    componentDidMount() {
        axios.get("http://localhost:90/sportsAndTravel/Footer/fetchData")
            .then((res) => {
                this.setState({
                    FooterData: res.data
                })
            })
            .catch((err) => {
                console.log(err.response)
            })
    }



    render() {
        return (
            // * ...........footer section............. *
            <footer class="tm-footer">

                {/* mappping or iterating  */}
                {this.state.FooterData.map(datas => {
                    localStorage.setItem("FooterID", datas._id)// storing footer id
                    localStorage.setItem("FooterImages", datas.Images)// storing footer Images
                    return (
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-2 col-lg-3 col-xl-3">
                                    <div class="tm-footer-content-box tm-footer-links-container">
                                        <div class="tm-2-cl-left">
                                            <img src={"http://localhost:90/" + datas.Images} class="img-fluid rounded-circle" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-5 ">
                                    <h3 class="tm-gold-text tm-title">{datas.Title}</h3>
                                    <p>{datas.Description}</p>
                                </div>

                                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 d-flex justify-content-end">
                                    <div class="tm-footer-content-box">
                                        <h3 class="tm-gold-text">Contact Us</h3>
                                        <div class="socialMediaitems">
                                            <a href="https://www.facebook.com/groups/479165842244875" rel="noopener noreferrer" target="_blank" class="m-2"><i class="fab fa-facebook"></i></a>
                                            <a href="#" class="m-2"><i class="fab fa-instagram-square"></i></a>
                                            <a href="#" class="m-2"><i class="fab fa-twitter-square"></i></a>
                                        </div>
                                        <p class="">{datas.Email}</p><hr class="tm-margin-b-30" />

                                    </div>

                                </div>
                            </div>

                        </div>
                    )
                })}

            </footer>

        )
    }
}
export default Footer