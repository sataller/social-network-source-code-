import {profileAPI, usersAPI} from "../API/api";


const ADD_POST = "network/profile/ADD_POST";
const SET_USER_PROFILE = "network/profile/SET_USER_PROFILE";
const SET_USER_STATUS = "network/profile/SET_USER_STATUS";
const DELETE_POST = "network/profile/DELETE_POST";
const SAVE_PHOTO_SUCCESS = "network/profile/SAVE_PHOTO_SUCCESS";
const FOLLOWING_STATUS = "network/profile/FOLLOWING_STATUS";


let initialisation = {
    posts: [
        {
            id: 1, text: "My first post!", likeCount: 12,
            avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png",

        },
        {
            id: 2, text: "My first post!", likeCount: 12,
            avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png",

        },
        {
            id: 3, text: "My first post!", likeCount: 12,
            avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png",

        },
    ],
    profile: null,
    status: "",
    followed: null,
}

const profileReducer = (state = initialisation, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 4,
                text: action.newText,
                likeCount: 0,
                avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png"
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newText: ""
            }

        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_USER_STATUS: {
            return {...state, status: action.status}
        }
        case DELETE_POST: {
            return {...state, posts: state.posts.filter(p => p.id != action.postId)}
        }
        case SAVE_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos}}
        }
        case FOLLOWING_STATUS: {
            return {...state, followed: action.status}
        }
        default:
            return state
    }
}

export const addPostAC = (newText) => {
    return ({type: ADD_POST, newText})
};

export const deletePost = (postId) => ({type: DELETE_POST, postId})

export const setProfile = (profile) => ({type: SET_USER_PROFILE, profile});

export const setStatus = (status) => ({type: SET_USER_STATUS, status});

export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});

export const followingStatus = (status) => ({type: FOLLOWING_STATUS, status});

export const setUsersProfile = (userId) => async (dispatch) => {
    const response = await usersAPI.setUsers(userId)
    dispatch(setProfile(response.data))
}

export const getStatus = (userId) => async (dispatch) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
export const savePhoto = (file) => async (dispatch) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const userFollowingStatus = (userId) => async (dispatch) => {
    const response = await usersAPI.getFollowingStatus(userId)
    dispatch(followingStatus(response.data))
}


export default profileReducer