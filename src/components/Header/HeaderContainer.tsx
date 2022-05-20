import React from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer";
import { AppStoreType } from "../../redux/redux-store";
import Header from "./Header";

type Props = {
    logout: () => void,
    isAuth: boolean,
    login: string,
}

class HeaderContainer extends React.Component<Props> {
    
    render = () => {
        return (
            <Header {...this.props} />
        )
    }
}

const mapStateToProps = (state: AppStoreType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export default connect(mapStateToProps, { logout })(HeaderContainer);