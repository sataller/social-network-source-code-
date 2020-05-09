import React from "react";
import style from "./Login.module.css"
import errorStyle from "../common/FormsControl/FormControl.module.css"
import {Field, reduxForm} from "redux-form";
import {createForm, Input} from "../common/FormsControl/FormsControl";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {LogIn} from "../../Redux/authReducer";
import {Redirect} from "react-router-dom";

const maxLength20 = maxLengthCreator(20)

const LoginForm = (props) => {

    return (
        <div>
            <form onSubmit={props.handleSubmit}>

                {createForm(Input, [required, maxLength20], "email", "email", "email") }
                {createForm(Input, [required, maxLength20], "password", "password", "password") }
                {createForm("input", null, "rememberMe", null, "checkbox", "remember me") }

                {props.captchaURL?<img src={props.captchaURL}/>: null}
                {props.captchaURL? createForm(Input, [required], "captcha", "Symbols from image", {}):null}

                {props.error && <div className={errorStyle.errorField}>
                    {props.error}
                </div>}
                <div>
                    <button className={style.sendButton}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

const LoginReduxForm = reduxForm({
    form: "login"
})(LoginForm)


const Login = (props) => {
    const onSubmit = (formData) => {
        props.LogIn(formData.email, formData.password, formData.rememberMe, formData.captcha)
        console.log(formData)
    }


    if (props.isAuth) {
        return <Redirect to="/profile"/>
    }

    return (
        <div className={style.login}>
            <h1>Login </h1>
            <LoginReduxForm captchaURL={props.captchaURL} onSubmit={onSubmit}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        captchaURL: state.auth.captchaURL,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {LogIn})(Login)