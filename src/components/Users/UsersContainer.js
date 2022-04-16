import React from "react";
import Users from "./Users";
import { connect } from "react-redux";
import { follow, setUsers, 
         unfollow, setCurrentPage, 
         setUsersCount, toggleFetching, 
         toggleFollowing } from "../../redux/users-reducer";
import { usersAPI } from "../../api/api";

class UsersAPIContainer extends React.Component {

    componentDidMount = () => {
        this.props.toggleFetching();
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
        .then(data => {
            this.props.toggleFetching();
            this.props.setUsers(data.items);
            if (data.totalCount > 100) data.totalCount = 100
            this.props.setUsersCount(data.totalCount);
        })
    }

    onPageChanged = (page) => {
        this.props.toggleFetching();
        this.props.setCurrentPage(page);
        usersAPI.getUsers(page, this.props.pageSize)
        .then(data => {
            this.props.toggleFetching();
            this.props.setUsers(data.items)
        })
    }

    render = () => {
        return <>
            {/* {this.props.isFetching ? <Preloader /> : null} */}
            <Users totalUsersCount={this.props.totalUsersCount} 
                      onPageChanged={this.onPageChanged}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      users={this.props.users}
                      follow={this.props.follow}
                      unfollow={this.props.unfollow}
                      isFetching={this.props.isFetching}
                      followingInProgres={this.props.followingInProgres}
                      toggleFollowing={this.props.toggleFollowing}
            /> 
        </>       
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

const dispatchObject = {follow, unfollow, setUsers, 
                        setCurrentPage, setUsersCount, toggleFetching,
                        toggleFollowing}

const UsersContainer = connect(mapStateToProps, dispatchObject)(UsersAPIContainer)

export default UsersContainer; 