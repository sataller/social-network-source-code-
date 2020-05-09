import React from "react";
import style from "./Profile.module.css"
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import ProfileDescriptionContainer from "./ProfileDescription/ProfileDescriptionContainer";


const Profile = (props) => {
    return (
        <div className={style.profile}>
            <div>
                <ProfileInfo className={style.profileEditing}
                             profile={props.profile}
                             savePhoto={props.savePhoto}
                             isAuth={props.isAuth}
                             followed={props.followed} followingInProgress={props.followingInProgress}
                             follow={props.follow} unfollow={props.unfollow}
                             followed={props.followed} startDialog={props.startDialog}
                             ownerId={props.ownerId}  isOwner={props.isOwner}
                             authUserId={props.authUserId}/>
            </div>

            <div>
                <ProfileDescriptionContainer className={style.profileInfo} state={props.state}
                                             profile={props.profile} dispatch={props.dispatch} status={props.status}
                                             getStatus={props.getStatus} updateStatus={props.updateStatus}
                                             ownerId={props.ownerId}  isOwner={props.isOwner}
                                             authUserId={props.authUserId}/>
            </div>
        </div>
    )
}

export default Profile