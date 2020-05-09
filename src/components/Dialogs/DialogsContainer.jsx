import React from "react"
import {connect} from "react-redux";
import {
    deleteMessageForMe,
    getDialogs,
    getMessages, restoreMessage, sendMessageInSpam,
    sendNewMessage,
    setActiveDialog,
    setMessageViewed,
    startDialog
} from "../../Redux/dialogsReducer";
import Dialogs from "./Dialogs";
import withAuthRedirect from "../../HOC/withAuthRedirect";

class DialogsContainer extends React.Component {

    componentDidMount() {
        this.props.getDialogs()
    }

    render() {
        return <Dialogs sendNewMessage={this.props.sendNewMessage} getDialogs={this.props.getDialogs}
                        startDialog={this.props.startDialog}
                        dialogsPage={this.props.dialogsPage} isAuth={this.props.isAuth}
                        authUserId={this.props.authUserId} dialogs={this.props.dialogs}
                        getMessages={this.props.getMessages} messages={this.props.messages}
                        sendNewMessage={this.props.sendNewMessage}
                        activeDialogId={this.props.activeDialogId} messageItems={this.props.messageItems}
                        numberOfPage={this.props.numberOfPage} messagePageSize={this.props.messagePageSize}
                        setActiveDialog={this.props.setActiveDialog} setMessageViewed={this.props.setMessageViewed}
                        sendMessageInSpam={this.props.sendMessageInSpam} spamMessagesId={this.props.spamMessagesId}
                        deleteMessagesId={this.props.deleteMessagesId} deleteMessageForMe={this.props.deleteMessageForMe}
                        restoreMessage={this.props.restoreMessage}/>
    }


}

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth,
        authUserId: state.auth.id,
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        activeDialogId: state.dialogsPage.activeDialogId,
        messageItems: state.dialogsPage.messageItems,
        messagePageSize: state.dialogsPage.messagePageSize,
        numberOfPage: state.dialogsPage.numberOfPage,
        spamMessagesId: state.dialogsPage.spamMessagesId,
        deleteMessagesId: state.dialogsPage.deleteMessagesId,
    }
}

let AuthRedirectComponent = withAuthRedirect(DialogsContainer)

export default connect(mapStateToProps, {sendNewMessage, getDialogs,
    startDialog, getMessages, setActiveDialog, setMessageViewed, sendMessageInSpam,
    deleteMessageForMe, restoreMessage})(AuthRedirectComponent)