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

const Dialogs = (props) => {
    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem id={d.id} userName={d.name} key={d.id}/>)
    let messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id}/>)
    let newMessageElement = React.createRef();

    const addMessage = () => {
        props.addMessage();
    }

    const updateNewPostMessage = () => {
        let text = newMessageElement.current.value;
        props.updateNewPostMessage(text);
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
                        <textarea ref={newMessageElement}
                                  value={props.dialogsPage.newPostMessage} 
                                  onChange={updateNewPostMessage} />
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