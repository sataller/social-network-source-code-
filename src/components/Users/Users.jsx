import React from "react";
import style from "./Users.module.css"
import User from "./User/User";
import Pagination from "../common/Pagination/Pagenation";

const Users = ({toggleFollowingProgress, followingInProgress, unfollow, follow, ...props}) => {
    return (

        <div className={style.users}>

            <Pagination className={style.pagination} totalCount={props.totalCount}
                        pageSize={props.pageSize}
                        currentPage={props.currentPage}
                        onPageChanged={props.onPageChanged}
                        paginationSize={props.paginationSize}/>
            {<div>{props.users.map(u => {
                return (<User id={u.id} key={u.id} avatar={u.photos.small} name={u.name}
                              status={u.status}
                              followed={u.followed}
                              follow={follow}
                              unfollow={unfollow}
                              followingInProgress={followingInProgress}
                              toggleFollowingProgress={toggleFollowingProgress}
                              isAuth={props.isAuth}
                              authUserId={props.authUserId} startDialog={props.startDialog}/>)
            })}</div>}

        </div>
    )
}


export default Users