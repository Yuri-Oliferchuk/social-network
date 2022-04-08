import React from "react";
import style from './Post.module.css'

const Post = () => {
    return (
        <div className={style.item}>
            <img src='./ava.png' alt='avatar'></img>
            post 1
            <div>
                <span>Like</span>
            </div>
        </div>
    );
}

export default Post;