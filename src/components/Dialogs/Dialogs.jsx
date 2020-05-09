import React from "react"
import NewMessage from "./NewMessage/NewMessage";
import User from "./Dialog/User/User";
import style from "./Dialogs.module.css"
import MessagesContainer from "./Dialog/Message/MessagesContainer";


const Dialogs = (props) => {
    debugger
    let usersElement = null;

    if (props.dialogs) {
        usersElement = props.dialogs.map(u => <User id={u.id}
                                                    avatar={u.photos.small}
                                                    name={u.userName}
                                                    key={u.id}
                                                    dialogs={props.dialogs}
                                                    newMessagesCount={u.newMessagesCount}
                                                    lastUserActivityDate={u.lastUserActivityDate}
                                                    lastDialogActivityDate={u.lastDialogActivityDate}
                                                    hasNewMessages={u.hasNewMessages}
                                                    getMessages={props.getMessages}
                                                    numberOfPage={props.numberOfPage}
                                                    messagePageSize={props.messagePageSize}
                                                    setActiveDialog={props.setActiveDialog}
        />)
    }

    return (

        <div className={style.dialogs}>

            <div className={style.users}>
                {usersElement}
            </div>
            <div className={style.messages}>
                <MessagesContainer activeDialogId={props.activeDialogId} dialogsPage={props.dialogsPage}
                                   getMessages={props.getMessages} numberOfPage={props.numberOfPage}
                                   messagePageSize={props.messagePageSize} authUserId={props.authUserId}
                                   setMessageViewed={props.setMessageViewed}
                                   spamMessagesId={props.spamMessagesId}
                                   deleteMessagesId={props.deleteMessagesId}
                                   deleteMessageForMe={props.deleteMessageForMe}
                                   restoreMessage={props.restoreMessage}/>
            </div>

            <div className={style.newMessage}>
                {props.activeDialogId ? <NewMessage dialogsPage={props.dialogsPage}
                                                    sendNewMessage={props.sendNewMessage}
                                                    activeDialogId={props.activeDialogId}
                                                    sendNewMessage={props.sendNewMessage}/> : null}
            </div>
        </div>
    )
}

export default Dialogs