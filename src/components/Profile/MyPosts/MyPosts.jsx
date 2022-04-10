import React from "react";
import style from './MyPosts.module.css'
import Post from "./Post/Post";

let postData = [
    {id: 1, message:'My first post', likesCount: 20},
    {id: 2, message:'Hello', likesCount: 9},
    {id: 3, message:'WTF?', likesCount: 12},
    {id: 4, message:'It`s a live', likesCount: 43},
    {id: 5, message:'o_O', likesCount: 100},
    {id: 6, message:'Hi all!', likesCount: 1},
]

let postsElements = postData.map(p => <Post message={p.message} likesCount={p.likesCount} />)

const MyPosts = () => {
    return (
        <div className={style.myPosts}>
            New post
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
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