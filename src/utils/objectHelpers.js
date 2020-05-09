export let updateObjectInArray = (items, objPropsName, itemId, newObjProps) => {
    return items.map(u => {
        if (u[objPropsName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u
    })
}

