import React from "react";
import Profile from "./Profile";
import {getStatus, savePhoto, setUsersProfile, updateStatus, userFollowingStatus} from "../../Redux/profileReducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getFollowingInProgress, getIsFetching} from "../../Redux/userSelectors";
import {follow, toggleFollowingProgress, unfollow} from "../../Redux/usersReducer";
import {startDialog} from "../../Redux/dialogsReducer";

class ProfileContainer extends React.Component {

    refreshProfile = () => {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authUserId;
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.setUsersProfile(userId)
        this.props.userFollowingStatus(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
        if (this.props.followed != prevProps.followed) {
            this.refreshProfile()
        }
    }

    render() {
        return (

            <Profile {...this.props} profile={this.props.profile}
                     status={this.props.status} updateStatus={this.props.updateStatus}
                     isOwner={!this.props.match.params.userId}
                     ownerId={this.props.match.params.userId}
                     savePhoto={this.props.savePhoto} isFetching={this.props.isFetching}
                     followingInProgress={this.props.followingInProgress}
                     follow={this.props.follow} unfollow={this.props.unfollow}
                     followingProgress={this.props.followingProgress} isAuth={this.props.isAuth}
                     authUserId={this.props.authUserId}
                     followed={this.props.followed} startDialog={this.props.startDialog}/>
        )
    }
}

// followed={props.followed}

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer)

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authUserId: state.auth.id,
    isAuth: state.auth.isAuth,
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    followed: state.profilePage.followed,

})

let WithRouterProfileContainer = withRouter(ProfileContainer)

export default connect(mapStateToProps, {
    setUsersProfile, getStatus, updateStatus,
    follow, unfollow, toggleFollowingProgress, savePhoto, userFollowingStatus, startDialog
})(WithRouterProfileContainer)