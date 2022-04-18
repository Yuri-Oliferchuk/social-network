import React from "react";
import style from "./Login.module.css"
import { Field } from "redux-form";
import { reduxForm } from "redux-form";
import { Input } from "../../../common/formsControls/FormsControls";
import { maxLengthCreator, requiredField } from "../validators";
import { login } from "../../../redux/auth-reducer";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const loginLength20 = maxLengthCreator(20);
const passLength20 = maxLengthCreator(20);

const LoginForm = (props) => {
    return (
        <form onSubmit={ props.handleSubmit } className={style.loginForm}>
            <h1>Login</h1>
            <div>
                <Field name="email" 
                       placeholder="email"
                       component={Input}
                       validate={[requiredField, loginLength20]} />
            </div>
            <div>
                <Field name="password" 
                       placeholder="Password"
                       type="password" 
                       component={Input}
                       validate={[requiredField, passLength20]} />
            </div>
            <div className={style.checkBoxContainer}>
                <label>Remember me:</label>
                <Field name="rememberMe" type={"checkbox"} component={"input"}/>
            </div>
            <div>
                <button className={style.loginButton}>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Navigate to='../profile' />
    }
    return (
        <div>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}


export default connect(mapStateToProps, {login})(Login);