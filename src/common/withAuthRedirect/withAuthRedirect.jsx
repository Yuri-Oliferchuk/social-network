import { connect } from "react-redux"
import { Navigate } from "react-router-dom"

const mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
})

const withAuthRedirect = (Component) => {
    const redirectComponent = (props) => {
        if (!props.isAuth) {return <Navigate to='../login' />}
        return <Component {...props} />
    }

    const ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(redirectComponent)
    return ConnectedAuthRedirectComponent;
}

export default withAuthRedirect;