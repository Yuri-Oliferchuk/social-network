import React from "react";
import style from './ProfileInfo.module.css'

const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img className={style.contentImg} src='./background.jpg' alt='background'></img>
            </div>
            <div className={style.profileInfo}>
                ava + description
            </div>
        </div>
    );
}

export default ProfileInfo;