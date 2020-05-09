import {dialogsAPI, usersAPI} from "../API/api";

const SET_AUTHORIZED_USER_PROFILE = "network/header/SET_AUTHORIZED_USER_PROFILE";
const UPDATE_NEW_MESSAGES_COUNT = "network/header/UPDATE_NEW_MESSAGES_COUNT";


let initialize = {
    authUserProfile: null,
    newMessagesCount:null,
}

const headerReducer = (state = initialize, action) => {
    switch (action.type) {
        case SET_AUTHORIZED_USER_PROFILE: {
            return {...state, authUserProfile: action.userProfile}
        }
        case UPDATE_NEW_MESSAGES_COUNT:{
            return{
                ...state,
                newMessagesCount: action.newMessagesCount,
            }
        }
        default:
            return state
    }
}

const setAuthorizedProfile = (userProfile) => ({type: SET_AUTHORIZED_USER_PROFILE, userProfile})

const updateNewMessagesCount = (newMessagesCount) => ({type: UPDATE_NEW_MESSAGES_COUNT, newMessagesCount})

export const getAuthUserInform = (userId) => async (dispatch) => {
    const response = await usersAPI.setUsers(userId)
    dispatch(setAuthorizedProfile(response.data))
}

export const displayNewMessages = () => async (dispatch) =>{
   const response = await dialogsAPI.getNewMessages()
    dispatch(updateNewMessagesCount(response.data))
}

export default headerReducer