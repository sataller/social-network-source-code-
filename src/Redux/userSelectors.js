// for complex selectors need use to library reselect

export const getUsers = (state) => {
    return state.usersPage.users
}

export const getPageSize = (state) => {
    return state.usersPage.pageSize
}

export const getTotalCount = (state) => {
    return state.usersPage.totalCount
}
export const getPaginationSize = (state) => {
    return state.usersPage.paginationSize
}

export const getCurrentPage= (state) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching
}
export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress
}
export const getIsAuth = (state) => {
    return state.auth.isAuth
}
export const getAuthUserId = (state) => {
    return state.auth.id
}



