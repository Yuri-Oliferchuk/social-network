import React from "react";
import Users from "./Users";
import withAuthRedirect from "../../common/withAuthRedirect/withAuthRedirect";
import { connect } from "react-redux";
import { setCurrentPage, requestUsers, unfollow, follow} from "../../redux/users-reducer";
import { compose } from "redux";
import { getCurrentPage, getFollowingInProgres, getIsFetching, 
         getPageSize, getTotalUsersCount, getUsers } from "../../redux/users-selectors";

class UsersAPIContainer extends React.Component {

    componentDidMount = () => { 
        const { currentPage, pageSize } = this.props;
        this.props.requestUsers(currentPage, pageSize); 
    }

    onPageChanged = (page) => { 
        const { pageSize } = this.props;
        this.props.requestUsers(page, pageSize); 
    }

    render = () => {
        return <Users totalUsersCount={this.props.totalUsersCount} 
                    onPageChanged={this.onPageChanged}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    isFetching={this.props.isFetching}
                    followingInProgres={this.props.followingInProgres}
                    unfollow={this.props.unfollow}
                    follow={this.props.follow}
                />      
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgres: getFollowingInProgres(state),
    }
}

const dispatchObject = {setCurrentPage, requestUsers, unfollow, follow}

export default compose(
    connect(mapStateToProps, dispatchObject),
    withAuthRedirect 
    )(UsersAPIContainer) 