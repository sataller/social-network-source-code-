import React from "react"
import style from "./User.module.css"
import noAvatar from "../../../../assets/images/avatar1.jpg"

const User = (props) => {

    //     lastDialogActivityDate: "2020-04-24T08:29:29.453"
//     lastUserActivityDate: "2020-04-23T12:24:37.177"
//  newMessagesCount
    //hasNewMessages

    const getThisDialogMessages = () => {
        props.setActiveDialog(props.id);
        props.getMessages(props.id, props.messagePageSize, props.numberOfPage);

    }

    return (
        <div className={style.user} onClick={getThisDialogMessages}>
            <div className={style.avatar}>
                {props.hasNewMessages ? <div className={style.newMessageCount}>{props.newMessagesCount}</div> : null}
                <img src={props.avatar ? props.avatar : noAvatar}/>
            </div>
            <div className={style.name}>{props.name}</div>
        </div>
    )
}

export default User