import React, { FC } from 'react'
import { Field, WrappedFieldProps } from 'redux-form'
import { FieldValidatorType } from '../../components/Forms/validators'
import style from './FormsControls.module.css'

export const Textarea: FC<WrappedFieldProps> = ({ input, meta: { touched, error }, ...props }) => {
  const hasError = touched && error
  return (
    <div className={`${style.formControl} ${hasError && style.error}`}>
      <div>
        <textarea {...input} {...props} />
      </div>
      {hasError && <span>{error}</span>}
    </div>
  )
}

export const Input: FC<WrappedFieldProps> = ({ input, meta: { touched, error }, ...props }) => {
  const hasError = touched && error
  return (
    <div className={`${style.formControl} ${hasError && style.error}`}>
      {hasError && <span>{error}</span>}
      <div>
        <input {...input} {...props} />
      </div>
    </div>
  )
}

export function createField<FormKeysType extends string>
    (name: FormKeysType, 
     placeholder: string, 
     component: FC<WrappedFieldProps>, 
     validators: Array<FieldValidatorType>, 
     props = {}) {
  return (
    <div>
      <Field name={name} placeholder={placeholder} component={component} validate={validators} {...props} />
    </div>
  )
}
