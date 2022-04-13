import React from "react";
import style from "./Users.module.css"

const Users = (props) => {
    
    if (props.users.length === 0) {
        props.setUsers([
            {id: 1, followed: true, photoUrl: '../../ava.png', fullName:'Yuriy', status: 'I am a BOS', location: {city: 'Kalush', country: 'Ukraine'}},
            {id: 2, followed: true, photoUrl: '../../ava.png', fullName:'Lena', status: 'I am a BOS wife', location: {city: 'Kalush', country: 'Ukraine'}},
            {id: 3, followed: false, photoUrl: '../../ava.png', fullName:'Oksana', status: 'I am a women', location: {city: 'Dnipro', country: 'Ukraine'}},
        ])
    }

    return (
        <div>
            { props.users.map( u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photoUrl} alt='ava' className={style.userPhoto} />
                        </div>
                        <div>
                            {(u.followed)?
                                <button onClick={() => props.unfollow(u.id)}>Unfollow</button>:
                                <button onClick={() => props.follow(u.id)}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.fullName}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{u.location.country}</div>
                            <div>{u.location.city}</div>
                        </span>
                    </span>
                </div>) }
        </div>
    )
}

export default Users;