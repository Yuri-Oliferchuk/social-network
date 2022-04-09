import React from "react";
import style from './Header.module.css';

const Header = () => {
    return (
        <header className={style.header}>
            <img src='../logo.png' alt='logo'></img>
        </header>
    );
}

export default Header;