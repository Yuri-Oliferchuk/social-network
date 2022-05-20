import { connect } from "react-redux";
import { compose } from "redux";
import withAuthRedirect from "../../common/withAuthRedirect/withAuthRedirect";
import { actions } from "../../redux/dialogs-reducer";
import { AppStoreType } from "../../redux/redux-store";
import Dialogs from "./Dialogs";

let mapStateToProps = (state: AppStoreType) => {
    return {
        state: state.dialogsPage,
    }
}
let mapDispatchToProps = {addMessage: actions.addMessage}

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
    )(Dialogs)

