import React from "react";
import style from './ProfileInfo.module.css'
import backgroundImg from '../../../assets/images/background.jpg'
import Preloader from "../../../common/preloader/Preloader";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div>
            <div>
                <img className={style.contentImg} src={backgroundImg} alt='background'></img>
            </div>
            <div>
                {props.profile.fullName}
            </div>
            <div>
                <img  src={props.profile.photos.large} alt='me'></img>
            </div>
            <div className={style.profileInfo}>
                {props.profile.aboutMe}
            </div>
        </div>
    );
}

export default ProfileInfo;