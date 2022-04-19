import { connect } from "react-redux";
import { compose } from "redux";
import withAuthRedirect from "../../common/withAuthRedirect/withAuthRedirect";
import { addMessage } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

let mapStateToProps = (state) => {
    return {
        state: state.dialogsPage,
    }
}

const DialogsContainer = compose(
    connect(mapStateToProps, { addMessage }),
    withAuthRedirect
    )(Dialogs)

export default DialogsContainer;