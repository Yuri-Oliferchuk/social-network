import React from "react";
import { NavLink } from "react-router-dom";
import { addMessageCreator, updateNewMessageCreator } from "../../redux/dialogs-reducer";
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

const Dialogs = (props) => {

    let state = props.store.getState().dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem id={d.id} userName={d.name} key={d.id}/>)
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id}/>)

    const addMessage = () => {
        props.store.dispatch(addMessageCreator());
    }

    const updateNewMessageBody = (e) => {
        let text = e.target.value;
        props.store.dispatch(updateNewMessageCreator(text));
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
                <div>
                    <div>
                        <textarea value={state.newMessageBody} 
                                  onChange={updateNewMessageBody}
                                  placeholder='Enter your message' />
                    </div>
                    <div>
                        <button onClick={addMessage}>Add message</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dialogs;