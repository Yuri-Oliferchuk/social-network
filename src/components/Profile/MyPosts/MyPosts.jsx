import React from "react";
import style from './MyPosts.module.css'
import Post from "./Post/Post";


const MyPosts = (props) => {
    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} key={p.id} />)
    
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