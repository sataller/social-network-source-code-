import React from "react"
import style from "./MyPosts.module.css"
import Post from "./Post/Post";
import NewPost from "./NewPost/NewPost";
import Preloader from "../../common/Preloader/Preloader";

const MyPosts = React.memo(props => {
        if (props.profilePage.profile ==null) {
            return <Preloader/>
        }

    let postsElement =
        props.profilePage.posts.map(p => <Post
            lickCount={p.lickCount} text={p.text} key={p.id} avatar={props.profilePage.profile.photos.small}/>)

    return (
        <div className={style.posts}>
            <div>
                <div className={style.info}>
                    <h2>Posts</h2>
                    <NewPost onAddPost={props.onAddPost} state={props.profilePage}/>
                </div>
                <div className={style.posts}>
                    {postsElement}
                </div>
            </div>
        </div>
    )
});

export default MyPosts