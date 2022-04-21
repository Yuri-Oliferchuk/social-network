import React from "react";
import style from "./Login.module.css"
import { reduxForm } from "redux-form";
import { createField, Input } from "../../../common/formsControls/FormsControls";
import { maxLengthCreator, requiredField } from "../validators";
import { login, getCaptchaURL } from "../../../redux/auth-reducer";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const loginLength20 = maxLengthCreator(20);
const passLength20 = maxLengthCreator(20);

const LoginForm = (props) => {
    return (
        <form onSubmit={ props.handleSubmit } className={style.loginForm}>
            <h1>Login</h1>
                {createField( "email", "Email", Input, [requiredField, loginLength20] )}
                {createField( "password", "Password", Input, [requiredField, passLength20], {type: "password"} )}
            <div className={style.checkBoxContainer}>
                <label>Remember me:</label>
                {createField( "rememberMe", "", Input, [], {type: "checkbox", className: style.checkBoxContainer} )}
            </div>
            {props.error &&
                <div className={style.formSummaryError}>
                    {props.error}
                </div>
            } 
            <div className={style.captchaBlock}>
                { props.captchaURL 
                    ?<div>
                        <img src={props.captchaURL} alt="captcha url" />
                        {createField( "captcha", "Captcha", Input, [])}
                    </div>
                    :<div></div>
                }  
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
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Navigate to='../profile' />
    }
    return (
        <div>
            <LoginReduxForm onSubmit={onSubmit}
                            captchaURL={props.captchaURL} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaURL: state.auth.captchaURL,
    }
}


export default connect(mapStateToProps, {login, getCaptchaURL})(Login);