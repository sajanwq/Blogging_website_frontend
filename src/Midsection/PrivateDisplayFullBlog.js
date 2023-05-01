import react from "react";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import BlogsYouMight from "./BlogsYouMight";
import CommentBox from "./CommentBox";
import ViewComment from "./ViewComment";
class PrivateDisplayFullBlog extends Component {
   

    render() {
        return (
            <>
                <div class="tm-blog-img-container">

                </div>

                <section class="tm-section">
                    <div class="blog-navbar d-flex justify-content-center p-4">
                        <h1 className="text-muted font-weight-bold"> Blogs</h1>

                    </div>



                    <div class="container-fluid">
                        <div class="row  d-flex justify-content-center">

                            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-9 col-xl-9">
                                <div className="mb-5"><p className="text-secondary font-weight-bolder">{localStorage.getItem("Date")}</p></div> {/*Date section*/}
                                <div class="tm-blog-post">
                                    <h3 class="tm-gold-text mb-5">{localStorage.getItem("Title")}</h3>
                                    <img src={"http://localhost:90/" + localStorage.getItem("PrivateBlogImages")}alt="Image" class="img-fluid tm-img-post" />

                                    <p>{localStorage.getItem("Introduction")}</p>

                                    <p> {localStorage.getItem("MainContent")}</p>
                                </div>
                                <div>
                                    <h3>Conclusion</h3>
                                    <p>{localStorage.getItem("Conclusion")}</p>
                                </div>

                            </div>
                        </div>



                    </div>
                    <BlogsYouMight></BlogsYouMight>
                    <ViewComment></ViewComment>
                    <div class="commentSection m-2 d-flex  justify-content-center">
                        <CommentBox></CommentBox>
                    </div>

                </section>





            </>
        )
    }

}
export default PrivateDisplayFullBlog