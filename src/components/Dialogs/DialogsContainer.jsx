import { connect } from "react-redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import { addMessageCreator, updateNewMessageCreator } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

let mapStateToProps = (state) => {
    return {
        state: state.dialogsPage,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateNewMessageBody: (text) => {
            dispatch(updateNewMessageCreator(text));
        },
        addMessage: () => {
            dispatch(addMessageCreator());
        }

    }
}

const DialogsContainer = connect(
    mapStateToProps, mapDispatchToProps)(withAuthRedirect(Dialogs))

export default DialogsContainer;