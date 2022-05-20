import React, { useState } from "react";
import style from './ProfileInfo.module.css';
import ava from '../../../assets/images/ava.png';
import Preloader from "../../../common/preloader/Preloader";
import ProfileData from "./ProfileStatus/ProfileData/ProfileData";
import ProfileDataForm from "../../Forms/ProfileDataForm/ProfileDataForm";



const ProfileInfo = (props) => {
    const [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if(e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        // console.log(formData);
        props.putData(formData)
            .then(() => {setEditMode(false)})
    }

    let profilePhoto = props.profile.photos.large;
    return (
        <div>
            <div className={style.profileInfo}>
                <div className={style.profilePhoto}>
                    <div className={style.photo}>
                        <img src={ profilePhoto ? profilePhoto : ava } alt='me'></img>
                    </div>
                    {props.isOwner &&
                        <input type={"file"} onChange={onMainPhotoSelected}></input>
                    }
                </div>
                { !editMode 
                ?
                <ProfileData profile={props.profile}
                             status={props.status}
                             isOwner={props.isOwner}
                             updateUserStatus={props.updateUserStatus}
                             goToEditMode={() => {setEditMode(true)}} />
                :
                <ProfileDataForm initialValues={props.profile}
                                 profile={props.profile}
                                 status={props.status}
                                 isOwner={props.isOwner}
                                 updateUserStatus={props.updateUserStatus}
                                 editMode={editMode}
                                 onSubmit={onSubmit} />
                }
            </div>
        </div>
    );
}

export default ProfileInfo;