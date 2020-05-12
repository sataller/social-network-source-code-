import React from "react"
import style from "./Dialog.module.css"
import Message from "./Message/Message";
import User from "./User/User";

const Dialog = (props) => {

    let usersElement = props.dialogsPage.dialogs.map( u =><User id={u.id}
                                                                           avatar={u.avatar}
                                                                           name={u.name}
                                                                           key={u.id}/>)

    let messageElement = props.dialogsPage.messages.map( m => <Message id={m.id}
                                                                                 key={m.id}
                                                                                 messages={m.text}/>)

    return (
        <div className={style.dialog}>
            <div className={style.users}>
                {usersElement}

            </div>

            <div className={style.messages}>
              {messageElement}
            </div>
        </div>
    )
}

export default Dialog