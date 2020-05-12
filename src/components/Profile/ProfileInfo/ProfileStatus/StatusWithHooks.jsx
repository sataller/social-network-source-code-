import React, {useEffect, useState} from "react"
import styles from "./Status.module.css"

const StatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    let activeEditMode = () => {
        setEditMode(true)
    }

    let deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    let onStatusChange = (e) => {
        console.log("changed")
        setStatus(e.currentTarget.value)
    }

    return (
        <div className={styles.status}>
            {!editMode &&
            <div>
                <span onDoubleClick={activeEditMode}> {props.status || "No status"}</span>
            </div>
            }
            {editMode &&
            <div>
                <input onChange={onStatusChange} onBlur={deactivateEditMode} value={status} autoFocus={true}/>
            </div>
            }
        </div>
    )
}

export default StatusWithHooks