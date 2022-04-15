import axios from "axios";
import React from "react";
import Users from "./Users";
import { connect } from "react-redux";
import { followAC, setUsersAC, unfollowAC, currentPageAC, usersCountAC } from "../../redux/users-reducer";

class UsersAPIContainer extends React.Component {
    // constructor (props) {
    //     super(props);
    // }

    componentDidMount = () => {
            let url = `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`
            axios.get(url).then(response => {
                this.props.setUsers(response.data.items);
                if (response.data.totalCount > 100) response.data.totalCount = 100
                this.props.setUsersCount(response.data.totalCount);
            })
    }

    onPageChanged = (page) => {
        this.props.setCurrentPage(page);
        let url = `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${page}`
            axios.get(url).then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render = () => {
        return <Users totalUsersCount={this.props.totalUsersCount} 
                      onPageChanged={this.onPageChanged}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      users={this.props.users}
                      follow={this.props.follow}
                      unfollow={this.props.unfollow}
                      />        
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId));
        },
        unfollow: (userId) => {
            dispatch(unfollowAC(userId));
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        },
        setCurrentPage: (pageNumber) => {
            dispatch(currentPageAC(pageNumber))
        },
        setUsersCount: (usersCount) => {
            dispatch(usersCountAC(usersCount))
        }

    }
}

const UsersContainer = connect(
    mapStateToProps, mapDispatchToProps)(UsersAPIContainer)

export default UsersContainer;