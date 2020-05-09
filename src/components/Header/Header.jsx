import React from "react";
import style from "./Header.module.css"
import {NavLink, Route} from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import HeaderInfo from "./HederInfo/HeaderInfo";

const Header = (props) => {
    return (

        <div className={style.header}>
            <div className={style.navbar}>
            <Navbar newMessagesCount={props.newMessagesCount}/>
            </div>
            <div className={style.login}>
                {props.isAuth ? <HeaderInfo {...props}/>
                    : <div className={style.buttons}>
                        <div className={style.loginButton}><NavLink to="/login/"> Login</NavLink></div>|
                        <div className={style.loginButton}><a href={"https://social-network.samuraijs.com/signUp"} target="_blank"> Sign Up</a></div>
                    </div>}
            </div>

        </div>
    )
}

export default Header