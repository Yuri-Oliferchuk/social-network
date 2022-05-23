import React, { FC } from 'react'
import { login } from '../../../redux/auth-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { AppStoreType } from '../../../redux/redux-store'
import { LoginReduxForm } from './LoginForm'

const Login: FC = () => {
  const isAuth = useSelector((state: AppStoreType) => state.auth.isAuth)
  const captchaURL = useSelector((state: AppStoreType) => state.auth.captchaURL)

  const dispatch = useDispatch()

  const onSubmit = (formData: any) => {
    dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
  }

  if (isAuth) {
    return <Navigate to='../profile' />
  }
  return (
    <div>
      <LoginReduxForm onSubmit={onSubmit} captchaURL={captchaURL} />
    </div>
  )
}

export default Login
