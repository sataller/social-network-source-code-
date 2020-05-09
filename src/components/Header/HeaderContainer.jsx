import React from "react";
import Header from "./Header";
import {getAuthUserData, Logout} from "../../Redux/authReducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {displayNewMessages, getAuthUserInform} from "../../Redux/headerReducer";

class HeaderContainer extends React.Component {

    updateHeader() {
        if (this.props.isAuth) {
            let userId = this.props.authorizedUserId
            this.props.getAuthUserInform(userId)
            this.props.displayNewMessages()
        }
    }

    componentDidMount() {
        this.updateHeader()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.isAuth !== prevProps.isAuth) {
            this.updateHeader()
        }
        if (this.props.newMessagesCount !== prevProps.newMessagesCount){
            this.props.displayNewMessages()
        }
    }

    render() {
        return <Header {...this.props}/>

    }

}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    authorizedUserId: state.auth.id,
    authProfileData: state.header.authUserProfile,
    newMessagesCount:state.header.newMessagesCount,
});

let WithRouterHeaderComponent = withRouter(HeaderContainer)

export default connect(mapStateToProps, {getAuthUserData, Logout, getAuthUserInform, displayNewMessages})(WithRouterHeaderComponent)