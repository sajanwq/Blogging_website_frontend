import React from "react";
import { Component } from "react";
import { NavLink } from "react-router-dom";
class Header extends Component {


    // creating function for logout option  it clears cookies 
    loggedOut = () => {
        localStorage.clear();
        window.location.href = "/"
    }


    render() {
        if (localStorage.getItem("token")) {
            if (localStorage.getItem("UserType") === "Admin") {

                var navItems =
                    <ul class="navbar-nav mr-5  UserAndSignup">
                        <li class="nav-item dropdown ">
                            <NavLink class=" dropdown-toggle  profiledropdown" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {localStorage.getItem("FullName")}
                            </NavLink>
                            <div class="dropdown-menu bg-light abacde" aria-labelledby="navbarDropdown">
                                <NavLink to="/MyProfile" class="dropProfile dropdown-item" ><i class="fas fa-user mr-1"></i>My profile</NavLink>
                                <div class="dropdown-divider"></div>
                                <NavLink to="/ViewUsers" class="dropUsers dropdown-item"><i class="fas fa-user mr-1"></i>View Users</NavLink>
                                <div class="dropdown-divider"></div>
                                <NavLink to="/MyBlogs" class="dropBlog dropdown-item" ><i class="fas fa-blog"></i> My Blogs</NavLink>
                                <div class="dropdown-divider"></div>
                                <NavLink to="/UpdateFooter" class="dropBlog dropdown-item" ><i class="far fa-edit"></i> Edit Footer</NavLink>
                                <div class="dropdown-divider"></div>
                                <NavLink to="/PostVideo" class="dropBlog dropdown-item" ><i class="fa fa-plus" aria-hidden="true"></i>Add Videos</NavLink>
                                <div class="dropdown-divider"></div>
                                <NavLink to="#" type="submit" onClick={this.loggedOut} class="dropLogout dropdown-item" ><i class="fas fa-sign-out-alt mr-1"></i> Logout</NavLink>
                            </div>
                        </li>
                    </ul>

            } else {

                var navItems =
                    <ul class="navbar-nav mr-5  UserAndSignup">
                        <li class="nav-item dropdown ">
                            <NavLink class=" dropdown-toggle  profiledropdown" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {localStorage.getItem("FullName")}
                            </NavLink>
                            <div class="dropdown-menu bg-light abacde" aria-labelledby="navbarDropdown">
                                <NavLink to="/MyProfile" class="dropProfile dropdown-item" ><i class="fas fa-user mr-1"></i>My profile</NavLink>
                                <div class="dropdown-divider"></div>
                                <NavLink to="/MyBlogs" class="dropBlog dropdown-item" ><i class="fas fa-blog"></i> My Blogs</NavLink>
                                <div class="dropdown-divider"></div>
                                <NavLink to="#" type="submit" onClick={this.loggedOut} class="dropLogout dropdown-item" ><i class="fas fa-sign-out-alt mr-1"></i> Logout</NavLink>
                            </div>
                        </li>
                    </ul>

            }

        } else {

            var navItems =
                <ul class="navbar-nav mr-5  UserAndSignup">
                    <li class="nav-item ">
                        <NavLink to="/login" className="loginnavlink" ><i class="fas fa-sign-in-alt mr-1 "></i><span className="loginlinks" >Login</span></NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink to="/signup" className="signupnavlink" ><i class="fas fa-user-plus mr-1"></i><span className="signuplinks" >SignUP</span></NavLink>
                    </li>
                </ul>


        }
        return (
            <nav class="navbar navbar-expand-lg  navbar-light bg-dark mynavbar p-5">
                <NavLink to="/" class="mynavbarlogo navbar-brand text-white " >Travel&Sports</NavLink>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon bg-light"></span>
                </button>

                <div class="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul class="navbar-nav ml-5 mr-auto">
                        <li class="nav-item  listvitrako">
                            <NavLink to="/" className="homelinks active"  >Home </NavLink>
                        </li>
                        <li class="nav-item ">
                            <NavLink to="/blogs" className="bloglinks"  >Blogs </NavLink>
                        </li>
                        <li class="nav-item  ">
                            <NavLink to="/Videos" className="videoslinks">Videos</NavLink>
                        </li>
                    </ul>

                    {/* items to display and hide */}
                    {navItems}


                </div>
            </nav>
        )
    }
}
export default Header