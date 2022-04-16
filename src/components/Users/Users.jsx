import React from "react";
import style from "./Users.module.css"
import userPhoto from "../../assets/images/ava.png"
import Preloader from "../../common/preloader/Preloader";
import { NavLink } from "react-router-dom";

const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount/props.pageSize);

    let pages = [];
    for (let i=1; i<=pagesCount; i++) {
        pages.push(i);
    }
    return (<div>
        <div className={style.usersMenu}>
            {pages.map(p => {
                return <span onClick={ () => props.onPageChanged(p)} 
                                className={(props.currentPage === p) ? style.selectedPage : undefined} 
                                key={p}>{p}</span>
            })}
        </div>
        {props.isFetching ? <Preloader /> : (
        <div className={style.usersList}>
            { props.users.map( u => <div className={style.userItem} key={u.id}>
                <span className={style.left}>
                    <div>
                        <NavLink to={'../profile/' + u.id}>
                            <img src={(u.photos.small) ? u.photos.small : userPhoto} 
                                alt='ava' className={style.userPhoto} />
                        </NavLink>
                    </div>
                    <div className={style.buttonContainer}>
                        {(u.followed)
                            ? <button disabled={props.followingInProgres.some( id => id === u.id)} 
                                className={style.unfollow} 
                                onClick={() => { props.unfollow(u.id) }}>Unfollow</button>
                            : <button disabled={props.followingInProgres.some( id => id === u.id)}
                                onClick={() => { props.follow(u.id) }}>Follow</button>
                        }
                    </div>
                </span>
                <span className={style.right}>
                    <span className={style.userInfo}>
                        <div className={style.userName}>{u.name}</div>
                        <div className={style.userStatus}>{u.status}</div>
                    </span>
                    <span className={style.userLocation}>
                        <div>{'u.location.country'}</div>
                        <div>{'u.location.city'}</div>
                    </span>
                </span>
            </div>) }
        </div>)}
    </div>)
}

export default Users;