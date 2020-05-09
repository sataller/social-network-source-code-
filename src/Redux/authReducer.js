import React from "react"
import {authAPI, securityAPI} from "../API/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "network/auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "network/auth/GET_CAPTCHA_URL_SUCCESS";

let initialization = {
    userId: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    captchaURL: null,
}

const authReducer = (state = initialization, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state
    }
}

export const setAuthUserData = (id, email, login, isAuth) => ({
    type: SET_USER_DATA, payload: {
        id, email, login, isAuth
    }
})

export const getAuthUserData = () => {
    return (dispatch) => {
        return authAPI.me().then(response => {
            console.log(response)
            if (response.resultCode === 0) {
                let {id, email, login, isAuth} = response.data
                dispatch(setAuthUserData(id, email, login, true))
            }
        })
    }
}

export const getCaptchaURLSuccess = (captchaURL) => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaURL}})


export const LogIn = (email, password, rememberMe, captcha) => {
    return (dispatch) => {
        authAPI.login(email, password, rememberMe, captcha).then(response => {
            if (response.resultCode === 0) {
                dispatch(getAuthUserData())
            } else {
                if (response.resultCode === 10) {
                    dispatch(getCaptchaURL())
                }
                let message = response.messages.length > 0 ? response.messages[0] : "some error";
                dispatch(stopSubmit("login", {_error: message}));
            }
        })
    }
}
export const getCaptchaURL = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaURL()
    const captchaURL = response.data.url;
    dispatch(getCaptchaURLSuccess(captchaURL));
}


export const Logout = () => {
    return (dispatch) => {
        authAPI.logout().then(response => {
            if (response.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        })
    }
}

export default authReducer;