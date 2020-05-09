import React, {useState} from "react";
import style from "./HeaderInfo.module.css"
import {NavLink} from "react-router-dom";
import avatar from "../../../assets/images/avatar1.jpg"
import Preloader from "../../common/Preloader/Preloader";

const HeaderInfo = (props) => {
    const [displayMenu, setDisplayMenu] = useState(false)

   let displayMenuNone = () => {
       if (displayMenu) {
           setDisplayMenu(false)
       }
    }

    let displayMenuChange = () => {
        if (displayMenu){
            setDisplayMenu(false)
        } else {
            setDisplayMenu(true)
        }
    }
    return (

        <div className={style.info} onMouseLeave={displayMenuNone} >
            {/*{props.isAuth? <div><div>{props.login}</div> <button onClick={props.Logout} className={style.logout}>Logout</button></div>*/}
            {/*    :<NavLink to="/login/" className={style.loginButton}> Login</NavLink>}*/}

            {props.authProfileData ?
                <div><img onClick={displayMenuChange}
                          className={style.avatar}
                          src={props.authProfileData.photos.small ? props.authProfileData.photos.small : avatar}/></div>:<Preloader/>}
            {displayMenu ? <div className={style.dropdownMenu}>
                <button onClick={props.Logout} className={style.logout}>Logout</button>
                <button onClick={() => { alert("Sorry! This page is under construction!")
                }} className={style.settings}>Settings
                </button>
            </div> : null}
        </div>
    )
}

export default HeaderInfo