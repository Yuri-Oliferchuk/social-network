import usersReducer, { actions, InitialState } from "./users-reducer"

let state: InitialState
beforeEach(() => {
   state = {
        users: [
            {id: 0, 
             name: 'Yura', 
             followed: false, 
             status: 'Status 0',
             photos: {large: null, small: null}},
            {id: 1, 
             name: 'Lena', 
             followed: false, 
             status: 'Status 1',
             photos: {large: null, small: null}},
            {id: 2, 
             name: 'Alisa', 
             followed: true, 
             status: 'Status 2',
             photos: {large: null, small: null}},
            {id: 3, 
             name: 'Andrey', 
             followed: true, 
             status: 'Status 3',
             photos: {large: null, small: null}}
        ],
        pageSize: 4,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgres: []
      }
})

test ("Following success", () => {
    const newState = usersReducer(state, actions.followSuccees(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test ("Unfollowing success", () => {
    const newState = usersReducer(state, actions.unfollowSuccees(3))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})