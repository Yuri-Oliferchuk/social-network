let state = {
    profilePage: {
        posts: [
            {id: 1, message:'My first post', likesCount: 20},
            {id: 2, message:'Hello', likesCount: 9},
            {id: 3, message:'WTF?', likesCount: 12},
            {id: 4, message:'It`s a live', likesCount: 43},
            {id: 5, message:'o_O', likesCount: 100},
            {id: 6, message:'Hi all!', likesCount: 1}
        ],
    },
    dialogsPage: {
        dialogs: [
            {id: 1, name:'Yura'},
            {id: 2, name:'Lena'},
            {id: 3, name:'Alisa'},
            {id: 4, name:'Andrey'},
            {id: 5, name:'Guest'},
            {id: 6, name:'Vova'}
        ],
        messages: [
            {id: 1, message:'Hi'},
            {id: 2, message:'How are you'},
            {id: 3, message:'WTF?'}
        ],
    }    
}

export let addPost = (postMessage) => {
    let newPost = {
        id: 7, message: postMessage, likesCount: 0
    }
    state.profilePage.posts.push(newPost)
}

export default state;