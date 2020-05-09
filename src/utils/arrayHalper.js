export const reversedCopy = (arr) => {
    let reversArr = []
    for (let i = arr.length; i--;) {
        reversArr.push(arr[i])
    }
    return reversArr
}

