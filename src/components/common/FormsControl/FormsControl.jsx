import React from "react"
import style from "./FormControl.module.css"
import {Field} from "redux-form";

export const FormControl = ({input, meta, children, ...props}) => {
    const hasError = meta.error && meta.touched && !meta.active;

    return (
        <div className={hasError ? style.formControl + " " + style.error : undefined}>
            {children}
            {hasError ? <span className={style.errorText}>{meta.error}</span> : undefined}
        </div>
    )
}
export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}> <textarea {...input} {...restProps}/> </FormControl>
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}> <input {...input} {...restProps}/> </FormControl>
}
export const createForm = (component, validators, name, placeholder, type, text = "") => {
    return (
        <div>
            <Field component={component} validate={validators} name={name} placeholder={placeholder} type={type}/>
            {text}
        </div>
    )
}