import React from "react";
import style from "./Tasks.module.css"
import Task from "./Task/Task";


const Tasks = (props) => {
    return (
        <div className={style.task}>
            <Task/>
        </div>
    )
}

export default Tasks