import React from "react"
import style from "./NewMessage.module.css"
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControl/FormsControl";
import {maxLengthCreator, required} from "../../../utils/validators/validators";

const maxLength300 = maxLengthCreator(300)

const NewMessageForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit} className={style.newMessage}>
            <div>
                <Field component={Textarea} validate={[required, maxLength300]}
                       placeholder="Write you message" name={"newMessageText"}/>
            </div>
            <div>
                <button className={style.sendButton}>Send</button>
            </div>
        </form>
    )
}

const NewMessageReduxForm = reduxForm({form: "newMessageForm"})(NewMessageForm)


const NewMessage = (props) => {
    let addMessage = (value) => {
        props.sendNewMessage(props.activeDialogId, value.newMessageText)
        value.newMessageText = "";

        console.log(value.newMessageText)
    }
    return (
        <div>
            <NewMessageReduxForm onSubmit={addMessage}/>
        </div>
    )
}

export default NewMessage