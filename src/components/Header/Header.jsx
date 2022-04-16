import React from "react";
import style from './Header.module.css';
import logo from './../../assets/images/logo.png'
import { NavLink } from "react-router-dom";

const Header = (props) => {
    return (
        <header className={style.header}>
            <img src={logo} alt='logo'></img>
            { (!props.isAuth) 
                ? <div className={style.loginBlock}>
                    <NavLink to='/login' >Login</NavLink>
                </div>
                : <div>
                    {/* <img src={props} */}
                    <div className={style.login}>{props.login}</div>
                </div>
            }
        </header>
    );
}

export default Header;