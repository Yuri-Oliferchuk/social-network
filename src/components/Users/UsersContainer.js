import React, { useEffect } from "react";
import Users from "./Users";
import withAuthRedirect from "../../common/withAuthRedirect/withAuthRedirect";
import { connect } from "react-redux";
import { setCurrentPage, requestUsers, unfollow, follow} from "../../redux/users-reducer";
import { compose } from "redux";
import { getCurrentPage, getFollowingInProgres, getIsFetching, 
         getPageSize, getTotalUsersCount, getUsers } from "../../redux/users-selectors";

const UsersAPIContainer = (props) => {

    const { currentPage, pageSize, requestUsers } = props;
    
    useEffect(() => {
        requestUsers(currentPage, pageSize);
    }, [requestUsers, currentPage, pageSize])


    const onPageChanged = (page) => { 
        const { pageSize } = props;
        props.requestUsers(page, pageSize); 
    }

    return <Users totalUsersCount={props.totalUsersCount} 
                onPageChanged={onPageChanged}
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                users={props.users}
                isFetching={props.isFetching}
                followingInProgres={props.followingInProgres}
                unfollow={props.unfollow}
                follow={props.follow}
            />      
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