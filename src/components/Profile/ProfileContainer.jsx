import React from "react";
import { connect } from "react-redux";
import withRouter from "../../common/withRouter/withRouter";
import { getUserProfile } from "../../redux/profile-reducer";
import Profile from "./Profile"

class ProfileContainer extends React.Component {

    componentDidMount = () => {
        this.props.getUserProfile(this.props.router.params.userId)
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

const dispatchObject = { getUserProfile }

let udc = withRouter(ProfileContainer)

export default connect(mapStateToProps, dispatchObject)(udc);