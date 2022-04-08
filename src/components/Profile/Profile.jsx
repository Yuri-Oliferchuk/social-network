import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import style from './Profile.module.css'

const Profile = () => {
    return (
        <div className={style.content}>
            <div>
            <img className={style.contentImg} src='./background.jpg' alt='background'></img>
            </div>
            <div>
            ava + description
            </div>
            <MyPosts />
        </div>
    );
}

export default Profile;