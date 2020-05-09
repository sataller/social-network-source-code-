import React from "react"
import style from "./ProfileDescription.module.css"
import Post from "./Post/Post";
import NewPost from "./NewPost/NewPost";
import Preloader from "../../common/Preloader/Preloader";
import UserInfo from "./UserInfo/UserInfo";
import ProfileInfo from "../ProfileInfo/ProfileInfo";

const ProfileDescription = React.memo(props => {
    if (props.profilePage.profile == null) {
        return <Preloader/>
    }
    let postsElement =
        props.profilePage.posts.map(p => <Post
            likeCount={p.likeCount} text={p.text} key={p.id} avatar={props.profilePage.profile.photos.small}
            fullName={props.profilePage.profile.fullName}/>)

    return (
        <div className={style.posts}>

            <UserInfo status={props.status}
                      getStatus={props.getStatus} updateStatus={props.updateStatus}
                      profile={props.profile} ownerId={props.ownerId}  isOwner={props.isOwner}
                      authUserId={props.authUserId}/>

            <div className={style.info}>

                <NewPost onAddPost={props.onAddPost} state={props.profilePage}/>
            </div>
            <div className={style.post}>
                {postsElement}
            </div>

        </div>
    )
});

export default ProfileDescription