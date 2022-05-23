import React, { FC } from 'react'
import style from './Login.module.css'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { createField, Input } from '../../../common/formsControls/FormsControls'
import { maxLengthCreator, requiredField } from '../validators'

const loginLength20 = maxLengthCreator(20)
const passLength20 = maxLengthCreator(20)

const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormProps> & LoginFormProps> = ({ handleSubmit, error, captchaURL }) => {
  return (
    <form onSubmit={handleSubmit} className={style.loginForm}>
      <h1>Login</h1>
      {createField<LoginFormTypesKeys>('email', 'Email', Input, [requiredField, loginLength20])}
      {createField<LoginFormTypesKeys>('password', 'Password', Input, [requiredField, passLength20], { type: 'password' })}
      <div className={style.checkBoxContainer}>
        <label>Remember me:</label>
        {createField<LoginFormTypesKeys>('rememberMe', '', Input, [], { type: 'checkbox', className: style.checkBoxContainer })}
      </div>
      {error && <div className={style.formSummaryError}>{error}</div>}
      <div className={style.captchaBlock}>
        {captchaURL ? (
          <div>
            <img src={captchaURL} alt='captcha url' />
            {createField<LoginFormTypesKeys>('captcha', 'Captcha', Input, [])}
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div>
        <button className={style.loginButton}>Login</button>
      </div>
    </form>
  )
}
export const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormProps>({ form: 'login' })(LoginForm)

type LoginFormProps = {
  captchaURL: string
}

type LoginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

type LoginFormTypesKeys = Extract<keyof LoginFormValuesType, string>