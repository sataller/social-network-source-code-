import React from "react"
import style from "./NewPost.module.css"
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../../common/FormsControl/FormsControl.jsx";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";

const maxLength50 = maxLengthCreator(50);
const NewPostForm = (props) => {

    // const deleteValue = () => {
    //     props.reset()
    //     alert("!")
    // }

    return (

        <form onSubmit={props.handleSubmit} className={style.newPost}>
            <h2>Posts</h2>
            <div>
                <Field component={Textarea} validate={[required, maxLength50]}
                       placeholder={"Enter new post"} name={"newPostText"}/>
            </div>
            <div>
                <button className={style.sendButton}>Post</button>
            </div>
        </form>
    )
}

const NewPostReduxForm = reduxForm({form: "newPostText"})(NewPostForm);

const NewPost = (props) => {
    let addPost = (value) => {
        props.onAddPost(value.newPostText)
        value.newPostText = "";
    }
    return (
        <div className={style.newPostBlock}>
            <NewPostReduxForm props={props} onSubmit={addPost}/>
        </div>
    )
}

export default NewPost