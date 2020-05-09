import React from "react"
import {addPostAC} from "../../../Redux/profileReducer";
import {connect} from "react-redux";
import ProfileDescription from "./ProfileDescription";


let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
        likeValue: state.profilePage.likeValue,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onAddPost: (newText) => {
            dispatch(addPostAC(newText));
        },
    }
}

const ProfileDescriptionContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileDescription)

export default ProfileDescriptionContainer