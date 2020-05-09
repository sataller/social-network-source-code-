import React from "react";
import style from "./Navbar.module.css"
import {NavLink} from "react-router-dom";

const Navbar = (props) => {
    return (
        <div className={style.navbar}>
            <div className={style.navItem}><NavLink to="/profile"> Profile </NavLink></div>
            |
            <div className={style.navItem}><NavLink to="/dialogs">Dialogs
                {(props.newMessagesCount !== 0) ? <span className={style.newMessagesCount}>{props.newMessagesCount}
</span> : null}
            </NavLink>
            </div>|
            <div className={style.navItem}><NavLink to="/users"> Users </NavLink></div>|
            <div className={style.navItem}><NavLink to="/todolists"> To do List </NavLink></div>
            {/*<div><NavLink to="/news">News</NavLink></div>*/}
            {/*<div><NavLink to="/settings">Settings</NavLink></div>*/}
            {/*<div><NavLink to="/music"> Music </NavLink></div>*/}

        </div>
    )
}

export default Navbar