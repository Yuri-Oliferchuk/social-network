import React from "react";
import style from './Header.module.css';
import logo from './../../assets/images/logo.png'
import { Navigate, NavLink } from "react-router-dom";

const Header = (props) => {
    const onLogout = () => {
        props.logout();
        <Navigate to='/profile' />
    }
    
    return (
        <header className={style.header}>
            <img src={logo} alt='logo'></img>
            { (!props.isAuth) 
                ? <div className={style.loginBlock}>
                    <NavLink to='/login' >Login</NavLink>
                </div>
                : <div className={style.userName}>
                    <div className={style.login}>{props.login}</div>
                    <button onClick={onLogout} >Logout</button>
                </div>
            }
        </header>
    );
}

export default Header;