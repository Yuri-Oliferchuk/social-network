import React from "react";
import style from './Post.module.css'

const Post = (props) => {
    return (
        <div className={style.item}>
            <img src='./ava.png' alt='avatar'></img>
            <p className={style.text}>{props.message}</p>
            <div className={style.likes}>
                <span>Like:{props.likeCount}</span>
            </div>
        </div>
    );
}

export default Post;