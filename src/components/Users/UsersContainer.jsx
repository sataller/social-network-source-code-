import React from "react";
import {connect} from "react-redux";
import {
    follow, requestUsers,
    setPage,
    toggleFollowingProgress,
    unfollow
} from "../../Redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {
    getAuthUserId,
    getCurrentPage,
    getFollowingInProgress, getIsAuth,
    getIsFetching,
    getPageSize, getPaginationSize,
    getTotalCount,
    getUsers
} from "../../Redux/userSelectors";
import {startDialog} from "../../Redux/dialogsReducer";

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users totalCount={this.props.totalCount} pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage} users={this.props.users}
                       follow={this.props.follow} unfollow={this.props.unfollow}
                       onPageChanged={this.onPageChanged}
                       followingInProgress={this.props.followingInProgress}
                       toggleFollowingProgress={this.props.toggleFollowingProgress}
                       paginationSize={this.props.paginationSize}
                       isAuth={this.props.isAuth}
                       authUserId={this.props.authUserId}
                       startDialog={this.props.startDialog}/>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalCount: getTotalCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        paginationSize: getPaginationSize(state),
        isAuth: getIsAuth(state),
        authUserId: getAuthUserId(state),

    })
}

export default connect(mapStateToProps, {
    follow, unfollow, setPage, toggleFollowingProgress, startDialog, getUsers: requestUsers
})(UsersContainer)
