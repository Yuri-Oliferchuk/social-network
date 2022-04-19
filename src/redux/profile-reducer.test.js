import profileReducer, { addPost, deletePost } from "./profile-reducer";

//jest tests
let state = {
    posts: [
        {id: 1, message:'My first post', likesCount: 20},
        {id: 2, message:'Hello', likesCount: 9},
    ],
}

it('length of post should be incremented', () => {
    // 1.test data
    let action = addPost("Hello in my world");
    // 2.action
    let NewState = profileReducer(state, action);
    // 3.expectation
    expect(NewState.posts.length).toBe(3);
})

it('message should be correct', () => {
    // 1.test data
    let action = addPost("Hello");
    // 2.action
    let NewState = profileReducer(state, action);
    // 3.expectation
    expect(NewState.posts[2].message).toBe("Hello");
})

it('after deleting length of messages soud be decrement', () => {
    // 1.test data
    let action = deletePost(2);
    // 2.action
    let NewState = profileReducer(state, action);
    // 3.expectation
    expect(NewState.posts.length).toBe(1);
})

it('after deleting length of messages soud`t be decrement if id incorect', () => {
    // 1.test data
    let action = deletePost(100);
    // 2.action
    let NewState = profileReducer(state, action);
    console.log(NewState.posts.length)
    // 3.expectation
    expect(NewState.posts.length).toBe(2);
})