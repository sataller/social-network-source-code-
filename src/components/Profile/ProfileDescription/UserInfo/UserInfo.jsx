import style from "./UserInfo.module.css"
import StatusWithHooks from "../ProfileStatus/StatusWithHooks";
import React from "react";
import ProfileInfo from "../../ProfileInfo/ProfileInfo";
import styles from "../ProfileStatus/Status.module.css";

const UserInfo = (props) => {

    return (
        <div className={style.userInfo}>
            <div className={style.mainInfo}>
                <div className={style.fullName}>{props.profile.fullName}</div>
                {(props.isOwner || props.authUserId === Number(props.ownerId)) ?
                    <StatusWithHooks status={props.status}
                                     getStatus={props.getStatus}
                                     updateStatus={props.updateStatus}/> :
                    <div className={styles.status}>
                        <span> {props.status || "No status"}</span>
                    </div>}
            </div>
            <div className={style.item}> About me:
                <div> {props.profile.aboutMe ? props.profile.aboutMe : "It's empty here so far"} </div>
            </div>
            <div className={style.item}> Looking for Job:
                {props.profile.lookingForAJob ?
                    <div>{props.profile.lookingForAJobDescription}</div> :
                    "I`m not looking for job"}
            </div>
            <div>Contacts:</div>
        </div>
    )
}

export default UserInfo