import React from "react";
import style from './MyPosts.module.css'
import Post from "./Post/Post";


const MyPosts = (props) => {
    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} key={p.id} />)
    let newPostElement = React.createRef();
    
    const addPost = () => {
        props.addPost();
    }

    const onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }

    return (
        <div className={style.myPosts}>
            New post
            <div>
                <div>
                    <textarea onChange={onPostChange} 
                              ref={newPostElement} 
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