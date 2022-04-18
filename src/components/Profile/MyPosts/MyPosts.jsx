import React from "react";
import ReduxInputPostForm from "../../Forms/InputPostForm/InputPostForm";
import style from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = (props) => {
    let postsElements = props.posts.map(p => <Post message={p.message} 
                                                   likesCount={p.likesCount} 
                                                   key={p.id} />)

    const onPostChange = (value) => {
        props.addPost(value.newPostArea);
    }

    return (
        <div className={style.myPosts}>
            New post
            <ReduxInputPostForm onSubmit={onPostChange} />
            <div className={style.myPostName}>
                My posts
            </div>
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;