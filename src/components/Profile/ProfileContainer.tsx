import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import withRouter from "../../common/withRouter/withRouter";
import { getUserProfile, getUserStatus, updateUserStatus, savePhoto, putData } from "../../redux/profile-reducer";
import { AppStoreType } from "../../redux/redux-store";
import { PhotosType, ProfileType } from "../../types/types";
import { ProfileFieldsType } from "../Forms/ProfileDataForm/ProfileDataForm";
import Profile from "./Profile"

type MapStatePropsType = {
    profile: {
        fullName: string,
        aboutMe: string,
        lookingForAJob: boolean,
        lookingForAJobDescription: string,
        contacts: Array<string>,
        photos: PhotosType,
    } 
    status: string
    authUserId: number
    isAuth: boolean
}

type MapDispatchPropsType = {
    getUserProfile: (id: number) => void
    getUserStatus: (id: number) => void 
    updateUserStatus: (status: string) => void
    savePhoto: (file: File) => void 
    putData: (data: ProfileFieldsType) => Promise<any>
}

type OwnPropsType = {
    router: {
        params: {
            userId: number
        }
    }
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId = this.props.router.params.userId 
        if(!userId) {
            userId = this.props.authUserId;
        }
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)
    }

    componentDidMount = () => {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<PropsType>) {
        if(this.props.router.params.userId !== prevProps.router.params.userId )
        this.refreshProfile()
    }

    render = () => {  
        const isOwner = !this.props.router.params.userId;          
        return (
            <div>
                <Profile {...this.props} 
                         profile={this.props.profile}
                         isOwner={ isOwner }
                         savePhoto={this.props.savePhoto} />
            </div>
        )
    }
}

const mapStateToProps = (state: AppStoreType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authUserId: state.auth.id,
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus, savePhoto, putData }),
    withRouter,
    )(ProfileContainer)