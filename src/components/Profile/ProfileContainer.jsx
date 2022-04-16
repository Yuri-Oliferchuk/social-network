import axios from "axios";
import React from "react";

import { connect } from "react-redux";
import withRouter from "../../common/withRouter/withRouter";
import { setUserProfile } from "../../redux/profile-reducer";
import Profile from "./Profile"

class ProfileContainer extends React.Component {

    componentDidMount = () => {
        let userId = this.props.router.params.userId;
        if (!userId) {
            userId = 23437;
        }
        let url = `https://social-network.samuraijs.com/api/1.0/profile/` + userId;
        axios.get(url).then(response => {
            this.props.setUserProfile(response.data);
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