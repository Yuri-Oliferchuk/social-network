import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./PrifileInfo/ProfileInfo";
// import style from './Profile.module.css'

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo />
            <MyPosts posts={props.profilePage.posts}
                     newPostText={props.profilePage.newPostText}
                     dispatch={props.dispatch} />
        </div>
    );
}

export default Profile;