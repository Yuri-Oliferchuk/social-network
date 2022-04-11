import React from "react";
import { addPostActionCreator, onPostChangeActionCreator } from "../../../redux/state";
import style from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = (props) => {
    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} key={p.id} />)
    
    const addPost = () => {
        props.dispatch(addPostActionCreator());
    }

    const onPostChange = (e) => {
        let text = e.target.value;
        props.dispatch(onPostChangeActionCreator(text));
    }

    return (
        <div className={style.myPosts}>
            New post
            <div>
                <div>
                    <textarea onChange={onPostChange} 
                              value={props.newPostText} />
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
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