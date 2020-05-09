import React from "react"
import style from "./Post.module.css"
import avatar from "../../../../assets/images/avatar1.jpg"

const Post = (props) => {
    const likeSwitching = () => {
        props.setLikeValue(!props.likeValue)
    }

    return (
        <div className={style.post}>
            <img src={props.avatar ? props.avatar : avatar}/>
            <div className={style.fullName}>{props.fullName}</div>
            <span className={style.postText}>{props.text}</span>
            <div className={style.likeCount}>{props.likeCount} like</div>
        </div>
    )
}

export default Post

