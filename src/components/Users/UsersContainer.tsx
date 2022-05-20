import React, { useEffect, FC } from "react";
import Users from "./Users";
import { connect } from "react-redux";
import { requestUsers, unfollow, follow} from "../../redux/users-reducer";
//@ts-ignore
import { compose } from "redux";
import { getCurrentPage, getFollowingInProgres, getIsFetching, 
         getPageSize, getTotalUsersCount, getUsers } from "../../redux/users-selectors";
import { UserType } from "../../types/types";
import { AppStoreType } from "../../redux/redux-store";

type MapStatePropsType = {
    currentPage: number 
    pageSize: number
    totalUsersCount: number
    isFetching: boolean
    users: Array<UserType>
    followingInProgres: Array<number>
}

type MapDispatchPropsType = {
    requestUsers: (currentPage: number, pageSize: number) => any
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const UsersAPIContainer: FC<PropsType> = (props) => {

    const { currentPage, pageSize, requestUsers } = props;
    
    useEffect(() => {
        requestUsers(currentPage, pageSize);
    }, [requestUsers, currentPage, pageSize])


    const onPageChanged = (page: number): void => { 
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
                pageTitle={props.pageTitle}
            />      
}

let mapStateToProps = (state: AppStoreType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgres: getFollowingInProgres(state),
    }
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStoreType>
    (mapStateToProps, {unfollow, follow, requestUsers}),
    )(UsersAPIContainer) 