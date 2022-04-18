import React from "react";
import { Field } from "redux-form";
import { reduxForm } from "redux-form";
import { Input } from "../../../common/formsControls/FormsControls";
import { maxLengthCreator, requiredField } from "../validators";

const loginLength20 = maxLengthCreator(20);
const passLength20 = maxLengthCreator(20);

const LoginForm = (props) => {
    return (
        <form onSubmit={ props.handleSubmit }>
            <div>
                <Field name="login" 
                       placeholder="Login"
                       component={Input}
                       validate={[requiredField, loginLength20]} />
            </div>
            <div>
                <Field name="password" 
                       placeholder="Password" 
                       component={Input}
                       validate={[requiredField, passLength20]} />
            </div>
            <div>
                <label>
                    Remember me: 
                    <Field name="rememberMe" type={"checkbox"} component={"input"}/>
                </label>
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData)
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

export default Login;