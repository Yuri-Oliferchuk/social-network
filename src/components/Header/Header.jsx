import React from "react";
import style from './Header.module.css';
import logo from './../../assets/images/logo.png'
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer";

const Header = (props) => {
    return (
        <header className={style.header}>
            <img src={logo} alt='logo'></img>
            { (!props.isAuth) 
                ? <div className={style.loginBlock}>
                    <NavLink to='/login' >Login</NavLink>
                </div>
                : <div className={style.userName}>
                    {/* <img src={props} */}
                    <div className={style.login}>{props.login}</div>
                    <button onClick={props.logout} >Logout</button>
                </div>
            }
        </header>
    );
}

export default connect(null, {logout})(Header);