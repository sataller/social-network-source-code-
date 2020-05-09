import React from "react"
import Messages from "./Messages";

class MessagesContainer extends React.Component {



    render() {

        return (
            <Messages activeDialogId={this.props.activeDialogId} dialogsPage={this.props.dialogsPage}
                     getMessages={this.props.getMessages}  numberOfPage={this.props.numberOfPage}
                     messagePageSize={this.props.messagePageSize} authUserId={this.props.authUserId}
                      setMessageViewed={this.props.setMessageViewed} sendMessageInSpam={this.props.sendMessageInSpam}
                      deleteMessageForMe={this.props.deleteMessageForMe}  spamMessagesId={this.props.spamMessagesId}
                      deleteMessagesId={this.props.deleteMessagesId}/>
        )
    }
}

export default MessagesContainer

