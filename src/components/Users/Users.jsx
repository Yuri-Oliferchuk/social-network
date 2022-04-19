import React from "react";
import style from "./Users.module.css"
import Preloader from "../../common/preloader/Preloader";
import Paginator from "../../common/paginator/Paginator"; 
import User from "./User/User";

const Users = (props) => {
    return (<div>
        <Paginator totalUsersCount={props.totalUsersCount} 
                   pageSize={props.pageSize}
                   onPageChanged={props.onPageChanged}
                   currentPage={props.currentPage} />
        {props.isFetching ? <Preloader /> : (
        <div className={style.usersList}>
            { props.users.map( u => <User user={u}
                                          followingInProgres={props.followingInProgres}
                                          unfollow={props.unfollow} 
                                          follow={props.follow} />)}
        </div>)}
    </div>)
}

export default Users;