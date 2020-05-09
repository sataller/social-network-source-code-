import {toDoListAPI} from "../API/api";
import {updateObjectInArray} from "../utils/objectHelpers";

const GET_LISTS = "network/toDoLists/GET_LISTS"
const ADD_NEW_LIST = "network/toDoLists/ADD_NEW_LIST"
const DELETE_LIST = "network/toDoLists/DELETE_LIST"
const UPDATE_LIST_TITLE = "network/toDoLists/UPDATE_LIST_TITLE"
const GET_TASKS = "network/toDoLists/GET_TASKS"
const CREATE_TASK = "network/toDoLists/CREATE_TASKS"
const UPDATE_TASK = "network/toDoLists/UPDATE_TASKS"
const DELETE_TASK = "network/toDoLists/DELETE_TASK"
const REORDER_TASK = "network/toDoLists/REORDER_TASK"

let initialisation = {
    toDoLists: [],
    tasksLists: [],
}

const todoListReducer = (state = initialisation, action) => {
    switch (action.type) {
        case GET_LISTS: {
            return {
                ...state,
                toDoLists: action.lists,
            }
        }
        case ADD_NEW_LIST: {
            return {
                ...state,
                toDoLists: [...state.toDoLists, action.newList]
            }
        }
        case DELETE_LIST: {
            return {
                ...state,
                toDoLists: state.toDoLists.filter(l => l.id !== action.listId)
            }
        }
        case UPDATE_LIST_TITLE: {
            return {
                ...state,
                toDoLists: updateObjectInArray(state.toDoLists, "id", action.listId, {title: action.title})
            }
        }
        case GET_TASKS: {
            return {
                ...state,
                // toDoLists: updateObjectInArray(state.toDoLists, "id", action.listId, {tasks: action.tasksList})
                tasksLists: [...state.tasksLists, {listId: action.listId, tasks: action.tasksList}],
            }
        }
        case CREATE_TASK: {
            return {
                ...state,
                tasksLists: state.tasksLists.map(u => {
                    if (u.id === action.listId) {
                        return {...u, tasks: [...u.tasks, action.newTask]}
                    }
                    return u
                })
            }
        }
        case UPDATE_TASK: {
            return {
                ...state,
                tasksLists: state.tasksLists.map(u => {
                    if (u.id === action.listId) {
                        return {
                            ...u, tasks: u.tasks.map(t => {
                                if (t.id === action.taskId) {
                                    return {...t, item: [action.newProperty]}
                                }
                            })
                        }
                    }
                    return u
                })
            }
        }
        case DELETE_TASK: {
            return {
                ...state,
                tasksLists: state.tasksLists.map(u => {
                    if (u.id === action.listId) {
                        return {
                            ...u, tasks: u.tasks.filter(t => t.id !== action.taskId)
                        }
                    }
                    return u
                })
            }
        }
        case REORDER_TASK:{
            return{
                ...state,
            }
        }

        default:
            return state
    }
}

export const getLists = (lists) => ({type: GET_LISTS, lists})

export const addNewList = (newList) => ({type: ADD_NEW_LIST, newList})

export const removeList = (listId) => ({type: DELETE_LIST, listId})

export const updateListTitle = (listId, title) => ({type: UPDATE_LIST_TITLE, listId, title})

export const getTasks = (listId, tasksList) => ({type: GET_TASKS, listId, tasksList})

export const createTask = (listId, newTask) => ({type: CREATE_TASK, listId, newTask})

export const updateTask = (listId, taskId, newProperty) => ({type: UPDATE_TASK, listId, taskId, newProperty})

export const deleteTask = (listId, taskId) => ({type: DELETE_TASK, listId, taskId})

export const reorderTask = (listId, taskId, putAfterItemId) => ({type: REORDER_TASK, listId, taskId, putAfterItemId})

export const getToDoLists = () => async (dispatch) => {
    const response = await toDoListAPI.getAllLists();
    dispatch(getLists(response.data))
}
export const createNewList = (title) => async (dispatch) => {
    const response = await toDoListAPI.createNewList(title);
    dispatch(addNewList(response.data))
}
export const deleteList = (listId) => async (dispatch) => {
    const response = await toDoListAPI.deleteList(listId);
    if (response.resultCode === 0) {
        dispatch(removeList(listId))
    }
}
export const updateList = (listId, title) => async (dispatch) => {
    const response = await toDoListAPI.updateList(listId, title);
    dispatch(updateListTitle(listId, title))
}

export const reorderLists = (listId, purAfterItemId) => async (dispatch) => {
    const response = await toDoListAPI.reorderList(listId, purAfterItemId);
    if (response.resultCode === 0) {
        // dispatch(stId,
    }
}

export const getTasksForList = (listId, count, page) => async (dispatch) => {
    const response = await toDoListAPI.getPortionTasksForList(listId, count, page);
    dispatch(getTasks(listId, response.data))
}
export const createTasksForList = (listId) => async (dispatch) => {
    const response = await toDoListAPI.createNewTaskForList(listId);
    dispatch(createTask(listId, response.data))
}
export const updateTasksForList = (listId, taskId, title, description, completed, status,
                                   priority, startDate, deadline) => async (dispatch) => {
    const response = await toDoListAPI.updateTasksForList(listId, taskId, title, description, completed, status,
        priority, startDate, deadline);
    if (response.resultCode === 0) {
        dispatch(updateTask(listId, taskId, response.data))
    }
}
export const deleteTasksForList = (listId, taskId) => async (dispatch) => {
    const response = await toDoListAPI.deleteTaskForList(listId, taskId);
    if (response.resultCode === 0) {
        dispatch(deleteTask(listId, taskId))
    }
}
export const changeTaskOrder = (listId, taskId, putAfterItemId) => async (dispatch) => {
    const response = await toDoListAPI.changeTaskOrder(listId, taskId);
    if (response.resultCode === 0) {
        dispatch(reorderTask(listId, taskId, putAfterItemId))
    }
}


export default todoListReducer
