import React from "react"
import style from "./Post.module.css"
import avatar from "../../../../assets/images/avatar1.jpg"

const Post = (props) => {

    return (
        <div className={style.post}>
            <img src={props.avatar? props.avatar:avatar}/>
            <span>{props.text}</span>
           <div className={style.lickCount}> {props.lickCount}lick</div>
        </div>
    )
}

export default Post

