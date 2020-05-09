import React from "react"
import {usersAPI} from "../API/api";
import {updateObjectInArray} from "../utils/objectHelpers";
import {followingStatus} from "./profileReducer";

const FOLLOW = "network/users/FOLLOW";
const UNFOLLOW = "network/users/UNFOLLOW";
const SET_USERS = "network/users/SET_USERS";
const SET_CURRENT_PAGE = "network/users/SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "network/users/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "network/users/TOGGLE_IS_FETCHING";
const FOLLOWING_IN_PROGRESS = "network/users/FOLLOWING_IN_PROGRESS";


let initialization = {
    users: [],
    pageSize: 10,
    totalCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    paginationSize:9,
}
let usersReducer = (state = initialization, action) => {
    switch (action.type) {
        case FOLLOW:
            console.log(action.userId)
            return {
                ...state,
                users: updateObjectInArray(state.users, "id", action.userId, {followed: true}),
            }

        case UNFOLLOW:
            console.log(action.userId)

            return {
                ...state,
                users: updateObjectInArray(state.users, "id", action.userId, {followed: false})
            }
        case SET_USERS: {
            return {...state, users: [...action.users]}

        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalCount: action.totalCount}
        }

        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }

        case FOLLOWING_IN_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId] :
                    state.followingInProgress.filter(id => id != action.userId)
            }
        }

        default:
            return state

    }
}

export let toggleFollowingProgress = (isFetching, userId) => ({type: FOLLOWING_IN_PROGRESS, isFetching, userId})
export let toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export let setPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export let setTotalUsersCount = (totalCount) => ({type: SET_TOTAL_USERS_COUNT, totalCount})
export let followSuccess = (userId) => ({type: FOLLOW, userId})
export let unfollowSuccess = (userId) => ({type: UNFOLLOW, userId})
export let setUsers = (users) => ({type: SET_USERS, users})


export let requestUsers = (currentPage, pageSize) => {
    return (async (dispatch) => {
        dispatch(setPage(currentPage))
        dispatch(toggleIsFetching(true));
        const data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(toggleIsFetching(false))

        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    })
}

let followUnfolowMechanic = (userId, success, act) => {
    return async (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId))
        let data = await act(userId)
        if (data.resultCode == 0) {
            dispatch(success(userId))
            dispatch(followingStatus(userId))
        }
        dispatch(toggleFollowingProgress(false, userId))
    }
}

export let follow = (userId) => {
    return followUnfolowMechanic(userId, followSuccess, usersAPI.followUser);
}

export let unfollow = (userId) => {
    return followUnfolowMechanic(userId, unfollowSuccess, usersAPI.unfollowUser);
}

export default usersReducer
