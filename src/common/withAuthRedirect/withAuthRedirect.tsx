import React, { FC } from "react"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { AppStoreType } from "../../redux/redux-store"

const mapStateToPropsForRedirect = (state: AppStoreType) => ({
    isAuth: state.auth.isAuth
})

type mapStateToPropsForRedirectType = ReturnType<typeof mapStateToPropsForRedirect>
type DispatchPropsType = {}

function withAuthRedirect<WCP>(WrapedComponent: React.ComponentType<WCP>) {
    const redirectComponent: FC<mapStateToPropsForRedirectType & DispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props
        if (!props.isAuth) {return <Navigate to='../login' />}
        return <WrapedComponent {...restProps as WCP} />
    }

    const ConnectedAuthRedirectComponent = connect<mapStateToPropsForRedirectType, DispatchPropsType, WCP, AppStoreType>(mapStateToPropsForRedirect)(redirectComponent)
    return ConnectedAuthRedirectComponent;
}

export default withAuthRedirect;