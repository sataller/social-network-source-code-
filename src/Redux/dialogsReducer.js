import {dialogsAPI} from "../API/api";
import {updateObjectInArray} from "../utils/objectHelpers";

const SEND_MESSAGE = "network/dialogs/SEND_MESSAGE";
const START_CHATTING = "network/dialogs/START_CHATTING";
const SET_DIALOGS = "network/dialogs/SET_DIALOGS";
const GET_DIALOGS_MESSAGES = "network/dialogs/GET_DIALOGS_MESSAGES";
const UPDATE_ACTIVE_DIALOG = "network/dialogs/UPDATE_ACTIVE_DIALOG";
const UPDATE_MESSAGE_VIEWED = "network/dialogs/UPDATE_MESSAGE_VIEWED";
const ADD_MESSAGE_IN_SPAM = "network/dialogs/ADD_MESSAGE_IN_SPAM";
const DELETE_MESSAGE = "network/dialogs/DELETE_MESSAGE";
const RETURN_MESSAGE = "network/dialogs/RETURN_MESSAGE";


let initialisation = {
    dialogs: [],
    activeDialogId: null,
    messages: null,
    messagesItems: null,
    messagePageSize: 20,
    numberOfPage: 1,
    spamMessagesId: [],
    deleteMessagesId: [],

};


let dialogsReducer = (state = initialisation, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            return {
                ...state,
                // item: [...state.messages.items, action.newMessage.message],
                messagesItems: [...state.messages.items, (action.newMessage)],
            }
        }
        case START_CHATTING: {
            return {
                ...state,
                dialogs: [...state.dialogs, action.dialog]
            }
        }
        case SET_DIALOGS: {
            return {
                ...state,
                dialogs: action.dialogs,
            }
        }
        case GET_DIALOGS_MESSAGES: {
            return {
                ...state,
                messages: action.messages,
                messagesItems: action.messages.items,
            }
        }
        case UPDATE_ACTIVE_DIALOG: {
            return {
                ...state,
                activeDialogId: action.userId,
            }
        }
        case ADD_MESSAGE_IN_SPAM: {
            return {
                ...state,
                spamMessagesId: [...state.spamMessagesId, action.messageId],
                messagesItems: updateObjectInArray(state.messagesItems, "id", action.messageId, {body: "Message is add to spam"})
            }
        }
        case DELETE_MESSAGE: {
            return {
                ...state,
                deleteMessagesId: [...state.deleteMessagesId, action.messageId],
                messagesItems: updateObjectInArray(state.messagesItems, "id", action.messageId, {body: "Message si deleted"})
            }
        }
        case RETURN_MESSAGE: {
            return {
                messagesItems: updateObjectInArray(state.messagesItems, "id", action.messageId, {body: "Message si deleted"})
            }
        }
        default:
            return state
    }
}

export const sendMessageAC = (newMessage) => ({type: SEND_MESSAGE, newMessage});

export const startChatting = (dialog) => ({type: START_CHATTING, dialog});

export const setDialogs = (dialogs) => ({type: SET_DIALOGS, dialogs});

export const getDialogMessages = (messages) => ({type: GET_DIALOGS_MESSAGES, messages})

export const updateActiveDialog = (userId) => ({type: UPDATE_ACTIVE_DIALOG, userId})

export const addMessageInSpam = (message) => ({type: ADD_MESSAGE_IN_SPAM, message})

export const deleteMessage = (messageId) => ({type: DELETE_MESSAGE, messageId})

export const returnMessage = (message) => ({type: RETURN_MESSAGE, message})

export const sendNewMessage = (userId, body) => async (dispatch) => {
    const response = await dialogsAPI.sendMessage(userId, body)
    if (response.data.resultCode === 0) {
        dispatch(sendMessageAC(response.data.data.message))

    }
}

export const startDialog = (userId) => async (dispatch) => {
    const response = await dialogsAPI.startChatting(userId)
    if (response.resultCode === 0) {
        dispatch(startChatting(response.data))
    }
}

export const getDialogs = () => async (dispatch) => {
    const response = await dialogsAPI.getDialogs()
    dispatch(setDialogs(response.data))
}

export const getMessages = (userId, count, pageNumber) => async (dispatch) => {

    const response = await dialogsAPI.getMassagesList(userId, count, pageNumber)
    dispatch(getDialogMessages(response.data))
}

export const setActiveDialog = (userId) => (dispatch) => {
    dispatch(updateActiveDialog(userId))
}

export const setMessageViewed = (messageId) => async (dispatch) => {
    await dialogsAPI.viewedMessage(messageId)
}

export const sendMessageInSpam = (messageId) => async (dispatch) => {
    const response = await dialogsAPI.addMassageToSpam(messageId);
    if (response.data.resultCode === 0) {
        dispatch(addMessageInSpam(response.data))
    }
}

export const deleteMessageForMe = (messageId) => async (dispatch) => {
    await dialogsAPI.deleteMessageForMe(messageId)
    dispatch(deleteMessage(messageId))
}

export const restoreMessage = (messageId) => async (dispatch) => {
    const response = await dialogsAPI.restoreMessage(messageId)
    dispatch(returnMessage(response.data))
}


export default dialogsReducer
