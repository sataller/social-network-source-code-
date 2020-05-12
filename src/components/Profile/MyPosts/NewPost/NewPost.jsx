import React from "react"
import style from "./NewPost.module.css"
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../../common/FormsControl/FormsControl.jsx";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import {Textarea1} from "../../../common/FormsControl/FormsControl";

const maxLength10 = maxLengthCreator(10);
const NewPostForm = (props) => {
    return (

        <form onSubmit={props.handleSubmit} className={style.newPost}>
            <div>
                <Field component={Textarea} validate={[required, maxLength10]}
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
        console.log(value)
    }
    return (
        <div>
            <NewPostReduxForm onSubmit={addPost}/>
        </div>
    )
}

export default NewPost