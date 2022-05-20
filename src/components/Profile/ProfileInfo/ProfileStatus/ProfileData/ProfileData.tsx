import React, { FC } from "react";
import ProfileStatus from "../ProfileStatus";
import style from "../ProfileData/ProfileData.module.css"

export type ProfileDataPropsType = {
    goToEditMode: () => void,
    profile: {
        fullName: string,
        aboutMe: string,
        lookingForAJob: boolean,
        lookingForAJobDescription: string,
        contacts: Array<string>,
    }
    profileinformation: string,
    status: string,
    updateUserStatus: (status: string) => void,
    isOwner: boolean,
}

const ProfileData: FC<ProfileDataPropsType> = (props) => {
    return (
        <>
            {props.isOwner && <div><button className={style.editModeButton} onClick={props.goToEditMode}>Edite mode</button></div>}
            <div className={style.profileName}>
                    {props.profile.fullName}
                </div>
                <div className={style.profileinformation}>
                    <div className={style.aboutMe}>
                        <b>About me:</b> {props.profile.aboutMe}
                    </div>
                    <div>
                        <ProfileStatus status={props.status}
                                    updateUserStatus={props.updateUserStatus}
                                    isOwner={props.isOwner} />
                    </div>
                    <div>
                        <b>Looking for a job:</b> {props.profile.lookingForAJob ? "Yes" : "No"}
                    </div>
                    { props.profile.lookingForAJob &&
                    <div className={style.mySkils}>
                        <b>My Skils:</b> {props.profile.lookingForAJobDescription}
                    </div>
                    }
                    <div className={style.contacts}>
                        <h3>Contacts:</h3>
                        <div className={style.items}>
                            {Object.keys(props.profile.contacts).map( item => {
                               return <Contact title={item} 
                                               value={props.profile.contacts[item]} 
                                               key={Object.keys(props.profile.contacts).indexOf(item)} />
                            }
                            )}
                        </div>

                    </div>
                </div>
        </>
    )
}

const Contact = ({title, value}) => {
    return (
        <>
        {value &&
            <div>
                <b>{title + `:`}</b> <a href={`https://${value}`}>{value}</a>
            </div>
        }
        </>
    )
}

export default ProfileData;

