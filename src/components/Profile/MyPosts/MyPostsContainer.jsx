import React from "react";
import { addPostActionCreator, onPostChangeActionCreator } from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";

const MyPostsContainer = (props) => {
    let state = props.store.getState();

    const addPost = () => {
        props.store.dispatch(addPostActionCreator());
    }

    const onPostChange = (text) => {
        props.store.dispatch(onPostChangeActionCreator(text));
    }

    return (<MyPosts updateNewPostText={onPostChange}
                     addPost={addPost} 
                     posts={state.profilePage.posts} 
                     newPostText={state.profilePage.newPostText} />);
}

export default MyPostsContainer;