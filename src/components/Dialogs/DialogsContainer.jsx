import React from "react";
import { addMessageCreator, updateNewMessageCreator } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";


const DialogsContainer = (props) => {

    let state = props.store.getState().dialogsPage;

    const addMessage = () => {
        props.store.dispatch(addMessageCreator());
    }

    const updateNewMessageBody = (text) => {
        props.store.dispatch(updateNewMessageCreator(text));
    }
    return <Dialogs state={state}
                    addMessage={addMessage}
                    updateNewMessageBody={updateNewMessageBody} />;
}

export default DialogsContainer;