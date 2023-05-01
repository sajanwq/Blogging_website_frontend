import React, { Component } from "react";
import Home from "./Home";
import { Route } from "react-router-dom"
import Signup from "./Signup";
import DisplaFullBlog from "./DisplayFullBlog";
import Blog from "./Blog";
import Login from "./Login";
import Videos from "./Videos";
import RegisteredUsers from "./RegisteredUsers";
import MyProfile from "./MyProfile";
import WriteBlog from "./WriteBlog";
import UpdatFooter from "./UpdateFooter";
import MyCreatedBlogs from "./MyCreatedBlogs";
import UpdateBlogs from "./UpdateBlogs";
import StarRatings from "./StarRatings";
import PrivateDisplayFullBlog from "./PrivateDisplayFullBlog";
import VideoUpload from "../VideoUpload";
import PostVideo from "./PostVideo";


class MidSection extends Component {
    render() {
        return (
            <>
                <switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/fullcontent" component={DisplaFullBlog} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/blogs" component={Blog} />
                    <Route path="/login" component={Login} />
                    <Route path="/Videos" component={Videos} />
                    <Route path="/ViewUsers" component={RegisteredUsers} />
                    <Route path="/MyProfile" component={MyProfile} />
                    <Route path="/WriteBlog" component={WriteBlog} />
                    <Route path="/UpdateFooter" component={UpdatFooter} />
                    <Route path="/MyBlogs" component={MyCreatedBlogs} />
                    <Route path="/UpdateBlogs" component={UpdateBlogs} />
                    <Route path="/ratings" component={StarRatings} />
                    <Route path="/PrivateDisplay" component={PrivateDisplayFullBlog} />
                    <Route path="/VideoUpload" component={VideoUpload} />
                    <Route path="/PostVideo" component={PostVideo} />




                </switch>
            </>
        )
    }
}
export default MidSection