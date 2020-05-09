import React from "react";
import style from "./ToDoLists.module.css"
import Tasks from "./Tasks/Tasks";
import Lists from "./Lists/Lists";
import {createNewList} from "../../Redux/todoListReducer";

const ToDoLists = (props) => {

    return (

        <div className={style.toDoLists}>
            <div className={style.lists}>
                <Lists createNewList={props.createNewList}/>
            </div>
            <div className={style.tasks}>
                tasks
                <Tasks/>
            </div>
        </div>
    )
}

export default ToDoLists