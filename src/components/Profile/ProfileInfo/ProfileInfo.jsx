import React, {useState} from "react"
import style from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader";
import avatar from "../../../assets/images/avatar1.jpg"
import loadFile from "../../../assets/loadFile2.jpg"
import {FollowingButton} from "../../Users/User/FollowingButtons/FollowingButton";


const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }
    return (
        <div className={style.info}>
            <div className={style.avatar}>
                {(props.isOwner || props.authUserId === Number(props.ownerId)) ?
                    <div><input className={style.avatarLoader} type={"file"} id={"avatarLoader"}
                                onChange={onMainPhotoSelected}/>
                        <label for={"avatarLoader"} > <img className={style.avatarImg}
                                                          src={props.profile.photos.large !== null ?
                                                              props.profile.photos.large : avatar}/>
                            <img className={style.avatarLoaderIcon} src={loadFile}/>
                        </label>
                    </div> : <img className={style.avatarImg} src={props.profile.photos.large !== null ?
                        props.profile.photos.large : avatar}/>}

                <FollowingButton isAuth={props.isAuth} authUserId={props.authUserId}
                            followed={props.followed} followingInProgress={props.followingInProgress}
                             follow={props.follow} unfollow={props.unfollow} id={props.profile.userId}
                                 startDialog={props.startDialog}/>

            </div>
        </div>
    )
}

export default ProfileInfo

