import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";


class MyCreatedBlogs extends Component {

    state = {
        BlogsList: [],

        config: {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }

    }




    // function  todisplay the blogs details
    componentDidMount() {
        axios.get("http://localhost:90/sportsAndTravel/Blog/MyBlog/" + localStorage.getItem("id"), this.state.config)
            .then((res) => {
                this.setState({
                    BlogsList: res.data
                })

            })
            .catch((err) => {
                console.log(err.response)
            })
    }


    // making functions for update
    updateClicked = (blog_Id) => {
        axios.get("http://localhost:90/sportsAndTravel/Blog/updateBlog/" + blog_Id, this.state.config)
            .then((res) => {
                console.log(res.data)
                localStorage.setItem("id_Blog", res.data._id)
                localStorage.setItem("Title", res.data.Title)
                localStorage.setItem("Introduction", res.data.Introduction)
                localStorage.setItem("MainContent", res.data.MainContent)
                localStorage.setItem("Conclusion", res.data.Conclusion)
                localStorage.setItem("BlogUpdateImages", res.data.Images)



                window.location.href = "/UpdateBlogs"

            })
            .catch((err) => {


            })


    }












    // making functions for show more
    shomoreClicked = (blog_Id) => {
        axios.get("http://localhost:90/sportsAndTravel/Blog/getFullData/" + blog_Id)
            .then((res) => {
                console.log(res.data)
                localStorage.setItem("Title", res.data.Title)
                localStorage.setItem("Introduction", res.data.Introduction)
                localStorage.setItem("MainContent", res.data.MainContent)
                localStorage.setItem("Conclusion", res.data.Conclusion)
                localStorage.setItem("PrivateBlogImages", res.data.Images)
                window.location.href = "/PrivateDisplay"
            })
            .catch((err) => {


            })

    }


    // function for delete buttons 
    ClickDeleteButton = (Blog_ID) => {
        var confirmation = window.confirm("Are you sure?")
        if (confirmation == false) {
            return false
        } else {
            axios.delete("http://localhost:90/sportsAndTravel/Blog/deleteMyBlog/" + Blog_ID, this.state.config)
                .then((res) => {
                    console.log(res.data.message)
                    window.location.href = "/MyBlogs"
                })
                .catch((err) => {
                    console.log(err.response)
                })

        }

    }





    render() {
        //  routes  protection for unlogged user(Either Admin or User)
        // if (!localStorage.getItem("token")) {
        //     return <Redirect to="/login" />

        // }
        return (
            <>
                <div class="tm-blog-img-container">

                </div>
                <section class="tm-section">

                    <div className="createblogsection float-right mb-5 mt-3 pr-5 mr-5">
                        <NavLink to="/WriteBlog" className="btn bg-primary "><i class="fas fa-plus mr-1"></i>Create New</NavLink>
                    </div>

                    <div class="container-fluid">
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
                                        <p>{datas.Introduction}</p>


                                        <div class="d-flex flex-row justify-content-between">
                                            <div className="BlogsInfoOption ">
                                                {/* <NavLink to="#" class=" btn success text-uppercase"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></NavLink> */}

                                                <li class="nav-item dropdown">
                                                    <NavLink class=" dropdown-toggle  BlogMoreOption" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                    </NavLink>
                                                    <div class="dropdown-menu mycreatedblogMoreOption" aria-labelledby="navbarDropdown">
                                                        <NavLink to="#" type="submit" class="dropProfile dropdown-item" onClick={() => this.updateClicked(datas._id)} ><i class="far fa-edit mr-1"></i>update</NavLink>
                                                        <div class="dropdown-divider"></div>
                                                        <NavLink to="#" onClick={() => { this.ClickDeleteButton(datas._id) }} class="dropUsers dropdown-item"><i class="far fa-trash-alt mr-1"></i>delete</NavLink>

                                                    </div>
                                                </li>

                                            </div>

                                            <div>
                                                <NavLink to="#" type="submit" class="tm-btn text-uppercase" onClick={() => this.shomoreClicked(datas._id)}>Read More</NavLink>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )
                        })}
                        {/* ***********iteration with maping function********** */}





                    </div>
                </section>

            </>
        )
    }
}
export default MyCreatedBlogs