import style from "../User.module.css";
import React from "react";
import {NavLink} from "react-router-dom";

export const FollowingButton = (props) => {

    let unfollow = () => {
        props.unfollow(props.id)
    }
    let follow = () => {
        props.follow(props.id)

    }

    let startDialog = () => {
        props.startDialog(props.id)
    }

    const followElement = (
        <div className={style.element}>
            <button className={style.followButton}
                    disabled={props.followingInProgress.some(id => id == props.id)}
                    onClick={follow}> Follow
            </button>
            <button className={style.dialogButton}><NavLink to={"/dialogs/"} onClick={startDialog}>Dialogs</NavLink></button>

        </div>
    )

    const unfollowElement = (
        <div className={style.element}>
            <button className={style.unfollowButton}
                    disabled={props.followingInProgress.some(id => id == props.id)}
                    onClick={unfollow}> Unfollow
            </button>
            <button className={style.dialogButton}><NavLink to={"/dialogs/"} onClick={startDialog}>Dialogs</NavLink></button>

        </div>
    )

    return (
        <div>
            {(props.isAuth && (props.authUserId !== props.id)) ? <div>{props.followed ?
                unfollowElement : followElement
            }
            </div> : null} </div>
    )
}