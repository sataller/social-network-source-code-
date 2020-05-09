import React from "react";
import ToDoLists from "./ToDoLists";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {
    changeTaskOrder,
    createNewList, createTasksForList,
    deleteList, deleteTasksForList,
    getTasksForList,
    getToDoLists,
    reorderLists,
    updateList, updateTasksForList
} from "../../Redux/todoListReducer";

class ToDoListsContainer extends React.Component {

    componentDidMount() {
        this.props.getToDoLists()
    }

    render() {
        return <ToDoLists {...this.props}/>

    }

}

const mapStateToProps = (state) => ({
    toDoLists: state.todoList.toDoLists,
    tasksLists: state.todoList.tasksLists,
});


export default connect(mapStateToProps, {getToDoLists, createNewList,
    deleteList, updateList, reorderLists, getTasksForList,
    createTasksForList, updateTasksForList, deleteTasksForList, changeTaskOrder})(ToDoListsContainer)