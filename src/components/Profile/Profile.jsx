import React from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
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