import React from "react";
import { Field } from "redux-form";
import style from "./FormsControls.module.css"
 
export const Textarea = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={`${style.formControl} ${ hasError && style.error}`} >
            <div>
                <textarea {...input} {...props} />   
            </div>
            { hasError && <span>{  meta.error }</span> }
        </div>
    )
}

export const Input = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={`${style.formControl} ${ hasError && style.error}`} >
            { hasError && <span>{  meta.error }</span> }
            <div>
                <input {...input} {...props} />   
            </div>
        </div>
    )
}

export const createField = (name, placeholder, component, validators, props={} ) => {
    return (
        <div>
            <Field name={name} 
                   placeholder={placeholder}
                   component={component}
                   validate={validators}
                   {...props} />
        </div>
    )
        
}