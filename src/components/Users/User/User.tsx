import React, { FC } from "react";
import style from "./User.module.css"
import userPhoto from "../../../assets/images/ava.png"
import { NavLink } from "react-router-dom";
import { UserType } from "../../../types/types";

type Props = {
    user: UserType
    followingInProgres: Array<number>
    unfollow: (id: number) => void
    follow: (id: number) => void
}

const User: FC<Props> = ({user, followingInProgres, unfollow, follow }) => {
    return (
        <div className={style.userItem}>
            <span className={style.left}>
                <div>
                    <NavLink to={'../profile/' + user.id}>
                        <img src={(user.photos.small) ? user.photos.small : userPhoto} 
                            alt='ava' className={style.userPhoto} />
                    </NavLink>
                </div>
                <div className={style.buttonContainer}>
                    {(user.followed)
                        ? <button disabled={followingInProgres.some( id => id === user.id)} 
                            className={style.unfollow} 
                            onClick={() => { unfollow(user.id) }}>Unfollow</button>
                        : <button disabled={followingInProgres.some( id => id === user.id)}
                            onClick={() => { follow(user.id) }}>Follow</button>
                    }
                </div>
            </span>
            <span className={style.right}>
                <span className={style.userInfo}>
                    <div className={style.userName}>{user.name}</div>
                    <div className={style.userStatus}>{user.status}</div>
                </span>
                <span className={style.userLocation}>
                    <div>{'u.location.country'}</div>
                    <div>{'u.location.city'}</div>
                </span>
            </span>
        </div>
    )
}

export default User;