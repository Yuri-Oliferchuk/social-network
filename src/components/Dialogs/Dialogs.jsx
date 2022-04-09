import React from "react";
import { NavLink } from "react-router-dom";
import style from './Dialogs.module.css';

const Dialogs = (props) => {
    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                <div className={style.dialog}>
                    <NavLink to='/dialogs/1' className={({isActive}) => (isActive ? style.active : null)}>Yuriy</NavLink>
                </div>
                <div className={style.dialog}>
                    <NavLink to='/dialogs/2' className={({isActive}) => (isActive ? style.active : null)}>Lena</NavLink>
                </div>
                <div className={style.dialog}>
                    <NavLink to='/dialogs/3' className={({isActive}) => (isActive ? style.active : null)}>Alisa</NavLink>
                </div>
                <div className={style.dialog}>
                    <NavLink to='/dialogs/4' className={({isActive}) => (isActive ? style.active : null)}>Andrey</NavLink>
                </div>
                <div className={style.dialog}>
                    <NavLink to='/dialogs/5' className={({isActive}) => (isActive ? style.active : null)}>Guest</NavLink>
                </div>
            </div>
            <div className={style.messages}>
                <div className={style.message}>Hi</div>
                <div className={style.message}>How are you</div>
                <div className={style.message}>WTF?</div>
            </div>
        </div>
    );
}

export default Dialogs;