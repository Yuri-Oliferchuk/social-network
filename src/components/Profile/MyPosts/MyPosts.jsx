import React from "react";
import style from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = () => {
    return (
        <div>
            my posts
            <div>
                <textarea></textarea>
                <button>Add post</button>
            </div>
            <div>
                New post
            </div>
            <div className={style.posts}>
                <Post message='My first post' likeCount='20' />
                <Post message='Hello' likeCount='9' />
                <Post message='WTF?' likeCount='12' />
                <Post message='It`s a live!' likeCount='43' />
                <Post message='o_O' likeCount='100' />
                <Post message='Hi all!' likeCount='1' />
            </div>
        </div>
    );
}

export default MyPosts;