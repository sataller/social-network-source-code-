import React, {useState} from "react"
import Message from "./Message";
import {reversedCopy} from "../../../../utils/arrayHalper";

const Messages = (props) => {

    let reversMessageElement = null;

    if (props.activeDialogId && props.dialogsPage.messagesItems) {
        let messageElement = props.dialogsPage.messagesItems;
        reversMessageElement = reversedCopy(messageElement).map(m => <Message id={m.id} key={m.id} messageText={m.body}
                                                                              recipientId={m.recipientId}
                                                                              senderId={m.senderId}
                                                                              senderName={m.senderName}
                                                                              translatedBody={m.translatedBody}
                                                                              viewed={m.viewed}
                                                                              totalCount={m.totalCount}
                                                                              addedAt={m.addedAt}
                                                                              authUserId={props.authUserId}
                                                                              setMessageViewed={props.setMessageViewed}
                                                                              sendMessageInSpam={props.sendMessageInSpam}
                                                                              deleteMessageForMe={props.deleteMessageForMe}/>)
    }

    return (
        <div>
            {reversMessageElement}
        </div>
    )
}
export default Messages
