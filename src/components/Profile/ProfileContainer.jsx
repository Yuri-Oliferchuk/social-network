import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import withRouter from "../../common/withRouter/withRouter";
import { getUserProfile, getUserStatus, updateUserStatus, savePhoto, putData } from "../../redux/profile-reducer";
import Profile from "./Profile"


class ProfileContainer extends React.Component {
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

    componentDidUpdate(prevProps, prevState) {
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

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authUserId: state.auth.id,
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus, savePhoto, putData }),
    withRouter,
    )(ProfileContainer)