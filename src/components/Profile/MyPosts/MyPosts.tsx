import React, { FC } from "react";
import ReduxInputPostForm, { InputPostFormValuesType } from "../../Forms/InputPostForm/InputPostForm";
import style from './MyPosts.module.css'
import Post from "./Post/Post";

type Post = {
    message: string,
    likesCount: number,
    id: number,
}
type Props = {
    posts: Array<Post>
    addPost: (post: string) => void,

}

const MyPosts: FC<Props> = (props) => {
    let postsElements = props.posts.map(p => <Post message={p.message} 
                                                   likesCount={p.likesCount} 
                                                   key={p.id} />)

    const onPostChange = (value: InputPostFormValuesType) => {
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