import React from "react";
import Users from "./Users";
import { connect } from "react-redux";
import { setCurrentPage, getUsers, unfollow, follow} from "../../redux/users-reducer";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class UsersAPIContainer extends React.Component {

    componentDidMount = () => { this.props.getUsers(this.props.currentPage, this.props.pageSize); }

    onPageChanged = (page) => { this.props.getUsers(page, this.props.pageSize); }

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
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgres: state.usersPage.followingInProgres,
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
const dispatchObject = {setCurrentPage, getUsers, unfollow, follow}

export default compose(
    connect(mapStateToProps, dispatchObject),
    withAuthRedirect 
    )(UsersAPIContainer) 