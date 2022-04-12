import React from "react";
import { addPostActionCreator, onPostChangeActionCreator } from "../../../redux/profile-reducer";
import StoreContext from "../../../storeContext";
import MyPosts from "./MyPosts";

const MyPostsContainer = (props) => {
    return (
        <StoreContext.Consumer>{
            (store) => {
                let state = store.getState();

                const addPost = () => {
                    store.dispatch(addPostActionCreator());
                }

                const onPostChange = (text) => {
                    store.dispatch(onPostChangeActionCreator(text));
                }

                return <MyPosts updateNewPostText={onPostChange}
                        addPost={addPost} 
                        posts={state.profilePage.posts} 
                        newPostText={state.profilePage.newPostText} />
            }}
        </StoreContext.Consumer>
    )
}

export default MyPostsContainer;