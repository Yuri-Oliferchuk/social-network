import { connect } from "react-redux";
import { compose } from "redux";
import withAuthRedirect from "../../common/withAuthRedirect/withAuthRedirect";
import { actions } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

let mapStateToProps = (state) => {
    return {
        state: state.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (newMessageBody) => {
            dispatch(actions.addMessage(newMessageBody))
        }
    }
}
const DialogsContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
    )(Dialogs)

export default DialogsContainer;