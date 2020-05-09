import React from "react";
import style from "./User.module.css"
import avatar from "../../../assets/images/avatar1.jpg"
import {NavLink} from "react-router-dom";
import {FollowingButton} from "./FollowingButtons/FollowingButton";

const User = (props) => {

    return (
        <div className={style.user}>
            <div className={style.avatar}>
                <NavLink to={"/profile/" + props.id} className={style.userPhoto}>
                    <img src={props.avatar !== null ? props.avatar : avatar}/>
                </NavLink>

            </div>
            <div className={style.information}>
                <div className={style.name}> {props.name}</div>
                <span
                    className={style.status}>{props.status ? `Status: + ${props.status}` : "I dosen`t have a status"} </span>
            </div>
            <FollowingButton isAuth={props.isAuth} authUserId={props.authUserId}
                             followed={props.followed} followingInProgress={props.followingInProgress}
                             follow={props.follow} unfollow={props.unfollow} id={props.id}
                             startDialog={props.startDialog}/>
        </div>)
}


export default User