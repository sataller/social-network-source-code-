import profileReducer from "./profileReducer";

let store = {
    _state: {
        dialogsPage: {
            dialogs: [
                {
                    id: 1, name: "Sandy",
                    avatar: "https://www.standingstills.com/pub/media/catalog/product/cache/75eed2686e01eb22cb4050b2f40ddf97/c/a/cac165-1-1.jpg",
                    messages: [
                        {id: 1, text: "Good!",},
                        {id: 2, text: "Ger!",},
                        {id: 3, text: "Gl!",},
                    ]
                },
                {
                    id: 2, name: "Gary",
                    avatar: "https://nick-intl.mtvnimages.com/uri/mgid:file:gsp:kids-assets:/nick/properties/spongebob-squarepants/characters/gary-character-web-desktop.png?height=0&width=480&matte=true&crop=false",
                    messages: [
                        {id: 1, text: "def!",},
                        {id: 2, text: "yere!",},
                        {id: 3, text: "sewr!",},
                    ]
                },

                {
                    id: 3, name: "Patric",
                    avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Patrick_Star.svg/1200px-Patrick_Star.svg.png",
                    messages: [
                        {id: 1, text: "uio!",},
                        {id: 2, text: "v!",},
                        {id: 3, text: "gnm!",},
                    ]
                },
                {
                    id: 4, name: "Squidward",
                    avatar: "https://f0.pngfuel.com/png/973/193/spongebob-squidward-doing-dab-clip-art-png-clip-art.png",
                    messages: [
                        {id: 1, text: "yhjm!",},
                        {id: 2, text: "[;l,m]!",},
                        {id: 3, text: "fdgdh!",},
                    ]
                }
            ],
            newText: "Hello!",

        },

        profilePage: {
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
            ],
            newText: "",
        },

        infoPage: {},

        usersPage: {
            users: [
                {
                    id: 1, name: "Sandy", location: {country: "Belarus", city: "Minsk"},
                    avatar: "https://www.standingstills.com/pub/media/catalog/product/cache/75eed2686e01eb22cb4050b2f40ddf97/c/a/cac165-1-1.jpg",
                    follow: false,
                },
                {
                    id: 2, name: "Gary", location: {country: "Spain", city: "Bilbao"},
                    avatar: "https://nick-intl.mtvnimages.com/uri/mgid:file:gsp:kids-assets:/nick/properties/spongebob-squarepants/characters/gary-character-web-desktop.png?height=0&width=480&matte=true&crop=false",
                    follow: true,
                },
                {
                    id: 3, name: "Patric", location: {country: "UK", city: "Manchester"},
                    avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Patrick_Star.svg/1200px-Patrick_Star.svg.png",
                    follow: true,
                },
                {
                    id: 4, name: "Squidward", location: {country: "USA", city: "LA"},
                    avatar: "https://f0.pngfuel.com/png/973/193/spongebob-squidward-doing-dab-clip-art-png-clip-art.png",
                    follow: false,
                },
            ]
        },

        sidebarPage: {}
    },

    getState() {
        return this._state
    },

    dispatch(action) {
        profileReducer(this.getState().profilePage, action)
        this.rerenderEntireTree(this)
    },
    subscribe(observer) {
        this.rerenderEntireTree = observer;
    },

    rerenderEntireTree() {
        console.log("render")
    }
}


window.state = store._state

export default store
