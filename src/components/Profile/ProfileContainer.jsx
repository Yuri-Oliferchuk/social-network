import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { setUserProfile } from "../../redux/profile-reducer";
import Profile from "./Profile"

class ProfileContainer extends React.Component {

    componentDidMount = () => {
        let url = `https://social-network.samuraijs.com/api/1.0/profile/2`
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

export default connect(mapStateToProps, dispatchObject)(ProfileContainer);