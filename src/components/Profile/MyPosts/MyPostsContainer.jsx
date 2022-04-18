import { connect } from "react-redux";
import { addPost } from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
        profile: state.profilePage.profile
    }
}

const dispatchObject = { addPost }

const MyPostsContainer = connect(mapStateToProps, dispatchObject)(MyPosts)

export default MyPostsContainer;