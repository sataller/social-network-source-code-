import React from "react"
import style from "./Message.module.css"
import {NavLink} from "react-router-dom";
import spamIcon from "../../../../assets/spamIcon.png"
import deleteIcon from "../../../../assets/deleteIcon.png"

const Message = (props) => {

    let addToSpam = () => {
        debugger
        props.sendMessageInSpam(props.id)
    }
    let deleteMessage = () => {
        debugger
        props.deleteMessageForMe(props.id)
    }

    if (props.senderId !== props.authUserId) {
        props.setMessageViewed(props.id);
        return (
            <div className={style.message}>
                <div>
                    <NavLink to={`/profile/${props.senderId}`}>
                        <span className={style.name}>{props.senderName}</span>
                    </NavLink>
                    <span className={style.date}>{props.addedAt}</span>
                    <img className={style.spamButton} src={spamIcon}
                         onClick={() => {
                             addToSpam()
                         }}/>
                </div>
                <div className={style.text}>{props.messageText}</div>
            </div>
        )
    }


    return (
        <div className={props.viewed ? style.message : (style.message + " " + style.viewed)}>
            <div>
                <NavLink to={`/profile/${props.senderId}`}>
                    <span className={style.name}>{props.senderName}</span>
                </NavLink>
                <span className={style.date}>{props.addedAt}</span>
                <img className={style.spamButton} src={deleteIcon}
                     onClick={() => {
                         deleteMessage()
                     }}/>
            </div>
            <div className={style.text}>{props.messageText}</div>
        </div>
    )
}

export default Message
