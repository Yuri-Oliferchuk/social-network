import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import withRouter from "../../common/withRouter/withRouter";
import withAuthRedirect from "../../hoc/withAuthRedirect";
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

export default compose(
    connect(mapStateToProps, { getUserProfile }),
    withRouter,
    withAuthRedirect
    )(ProfileContainer)