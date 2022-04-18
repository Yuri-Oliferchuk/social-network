import React from "react";
import style from './ProfileInfo.module.css';
// import backgroundImg from '../../../assets/images/background.jpg';
import ava from '../../../assets/images/ava.png';
import Preloader from "../../../common/preloader/Preloader";
import ProfileStatus from "./ProfileStatus/ProfileStatus"

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }

    let profilePhoto = props.profile.photos.large;
    return (
        <div>
            {/* <div>
                <img className={style.contentImg} src={backgroundImg} alt='background'></img>
            </div> */}
            <div className={style.profileInfo}>
                <div className={style.profilePhoto}>
                    <img src={ profilePhoto ? profilePhoto : ava } alt='me'></img>
                </div>
                <div className={style.profileName}>
                    {props.profile.fullName}
                </div>
                <div className={style.profileStatus}>
                    <ProfileStatus status={props.status}
                                   updateUserStatus={props.updateUserStatus} />
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;