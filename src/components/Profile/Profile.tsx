import React, { FC } from "react";
import { PhotosType } from "../../types/types";
import { ProfileFieldsType } from "../Forms/ProfileDataForm/ProfileDataForm";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type Props = {
    profile: {
        fullName: string,
        aboutMe: string,
        lookingForAJob: boolean,
        lookingForAJobDescription: string,
        contacts: Array<string>,
        photos: PhotosType,
    },
    savePhoto: (file: File) => void,
    isOwner: boolean, 
    status: string,
    updateUserStatus: (status: string) => void
    putData: (data: ProfileFieldsType) => Promise<any>


}

const Profile: FC<Props> = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile} 
                         status={props.status}
                         updateUserStatus={props.updateUserStatus}
                         isOwner={props.isOwner}
                         savePhoto={props.savePhoto}
                         putData={props.putData} />
            <MyPostsContainer />
        </div>
    );
}

export default Profile;