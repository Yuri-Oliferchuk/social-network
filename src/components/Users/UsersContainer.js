import React from "react";
import Users from "./Users";
import { connect } from "react-redux";
import { setCurrentPage, requestUsers, unfollow, follow} from "../../redux/users-reducer";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { getCurrentPage, getFollowingInProgres, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from "../../redux/users-selectors";

class UsersAPIContainer extends React.Component {

    componentDidMount = () => { this.props.requestUsers(this.props.currentPage, this.props.pageSize); }

    onPageChanged = (page) => { this.props.requestUsers(page, this.props.pageSize); }

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

// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgres: state.usersPage.followingInProgres,
//     }
// }

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

// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId));
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId));
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users));
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(currentPageAC(pageNumber))
//         },
//         setUsersCount: (usersCount) => {
//             dispatch(usersCountAC(usersCount))
//         },
//         toggleFetching: () => {
//             dispatch(fetchingAC())
//         }

//     }
// }

const dispatchObject = {setCurrentPage, requestUsers, unfollow, follow}

export default compose(
    connect(mapStateToProps, dispatchObject),
    withAuthRedirect 
    )(UsersAPIContainer) 