import React from "react"
import style from "./Lists.module.css"
import List from "./List/List";
import {createNewList} from "../../../Redux/todoListReducer";

const Lists = (props) => {

    let addNewList = () => {
        props.createNewList()
    }

    return (
        <div >
            <h2>Task Lists</h2>
            <List/>
            <div>
                <input type/>
                <span className={style.addButton} onClick={addNewList}>+ New List</span>
            </div>
        </div>
    )
}

export default Lists