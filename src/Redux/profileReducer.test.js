import profileReducer, {addPostAC, deletePost} from "./profileReducer";

let state = {
    posts: [
        {
            id: 1, text: "My first post!", lickCount: 12,
            avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png"
        },
        {
            id: 2, text: "My first post!", lickCount: 12,
            avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png"
        },
        {
            id: 3, text: "My first post!", lickCount: 12,
            avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png"
        },
    ]
}

it("length of posts should be incremented", () => {
// 1. test data
    let action = addPostAC("new Post ")
    // 2. action
    let newState = profileReducer(state, action)
// 3. expectation
    expect(newState.posts.length).toBe(4)
})

it("Post text should be corrected", () => {
    let action = addPostAC("new Post ")

    let newState = profileReducer(state, action)

    expect(newState.posts[3].text).toBe("new Post ")
})

it("Post has been deleted", () => {
    let action = deletePost(1)

    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(2)
})

it(" After deleting number of post doesn't change if id incorrect", () => {
    let action = deletePost(1000)

    let newState = profileReducer(state, action)

    expect (newState.posts.length).toBe(3)
})