import React from "react";
import { connect } from "react-redux";
import { profileAPI } from "../../api/api";
import withRouter from "../../common/withRouter/withRouter";
import { setUserProfile } from "../../redux/profile-reducer";
import Profile from "./Profile"

class ProfileContainer extends React.Component {

    componentDidMount = () => {
        profileAPI.getProfile(this.props.router.params.userId)
            .then(data => {
                this.props.setUserProfile(data);
            })
    }

    render = () => {            
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
})

const dispatchObject = { setUserProfile }

let udc = withRouter(ProfileContainer)

export default connect(mapStateToProps, dispatchObject)(udc);