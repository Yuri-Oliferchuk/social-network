import React from "react";
import { addMessageCreator, updateNewMessageCreator } from "../../redux/dialogs-reducer";
import StoreContext from "../../storeContext";
import Dialogs from "./Dialogs";


const DialogsContainer = (props) => {
    return (
        <StoreContext.Consumer>{ (store) => {
            let state = store.getState().dialogsPage;

            const addMessage = () => {
                store.dispatch(addMessageCreator());
            }

            const updateNewMessageBody = (text) => {
                store.dispatch(updateNewMessageCreator(text));
            }

            return (<Dialogs state={state}
                             addMessage={addMessage}
                             updateNewMessageBody={updateNewMessageBody} />)
            }
        }
        </StoreContext.Consumer>
    )
}

export default DialogsContainer;