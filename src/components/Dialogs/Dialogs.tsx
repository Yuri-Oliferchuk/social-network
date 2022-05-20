import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { Dialog, Messages } from "../../redux/dialogs-reducer";
import ReduxAddMessageForm from "../Forms/AddMessageForm/AddMessageForm";
import style from './Dialogs.module.css';

const DialogItem: FC<DialogItemProps> = (props) =>{
    const path = '/dialogs/' + props.id;
    return (
        <div className={style.dialog}>
            <NavLink to={path} className={({isActive}) => (isActive ? style.active : null)}>{props.userName}</NavLink>
        </div>
    );
}

const Message: FC<MessageProps> = (props) => {
    return (
        <div className={style.message}>{props.message}</div>
    );
}

const Dialogs: FC<DialogsProps> = (props) => {
    let dialogsElements = props.state.dialogs.map(d => <DialogItem id={d.id} userName={d.name} key={d.id}/>)
    let messagesElements = props.state.messages.map(m => <Message message={m.message} key={m.id}/>)

    const addNewMessage = (value: {newMessageBody: string}) => {
        props.addMessage(value.newMessageBody);
    }
    
    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={style.messages}>
                <div>
                    {messagesElements}
                </div>
                <ReduxAddMessageForm onSubmit={addNewMessage}/>
            </div>
        </div>
    );
}

export default Dialogs;

type DialogItemProps = {
    id: number,
    userName: string,
}
type MessageProps = {
    message: string,
}
type DialogsProps = {
    state: {
        dialogs: Array<Dialog>,
        messages: Array<Messages>
    }
    addMessage: (value: string) => void
}