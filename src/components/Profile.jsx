import React from "react";
import style from './Profile.module.css'

const Profile = () => {
    return (
        <div className={style.content}>
            <div>
            <img src='./background.jpg' alt='background'></img>
            </div>
            <div>
            ava + description
            </div>
            <div>
            my posts
            <div>
                New post
            </div>
            </div>
            <div className={style.posts}>
                <div className={style.item}>post 1</div>
                <div className={style.item}>post 2</div>
            </div>
        </div>
    );
}

export default Profile;