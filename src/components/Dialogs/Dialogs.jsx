import React from "react";
import { NavLink } from "react-router-dom";
import style from './Dialogs.module.css';

const DialogItem = (props) =>{
    const path = '/dialogs/' + props.id;
    return (
        <div className={style.dialog}>
            <NavLink to={path} className={({isActive}) => (isActive ? style.active : null)}>{props.userName}</NavLink>
        </div>
    );
}

const Message = (props) => {
    return (
        <div className={style.message}>{props.message}</div>
    );
}

let dialogsData = [
        {id: 1, name:'Yura'},
        {id: 2, name:'Lena'},
        {id: 3, name:'Alisa'},
        {id: 4, name:'Andrey'},
        {id: 5, name:'Guest'},
        {id: 6, name:'Vova'},
]


let messagesData = [
    {id: 1, message:'Hi'},
    {id: 2, message:'How are you'},
    {id: 3, message:'WTF?'},
]

let dialogsElements = dialogsData.map(d => <DialogItem id={d.id} userName={d.name} />)
let messagesElements = messagesData.map(m => <Message message={m.message} />)

const Dialogs = (props) => {
    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={style.messages}>
                {messagesElements}
            </div>
        </div>
    );
}

export default Dialogs;