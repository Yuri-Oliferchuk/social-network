import { ResultCodesEnum } from '../api/api'
import { followAPI, FollowingResponseType } from '../api/followAPI'
import { actions, follow, unfollow } from './users-reducer'

//Create mock API object
jest.mock('../api/followAPI')

//Create mocked server answer
const result: FollowingResponseType = {
  data: {},
  messages: '',
  resultCode: ResultCodesEnum.Success
}

//Create TypeScript types for mocked API
const followAPIMock = followAPI as jest.Mocked<typeof followAPI>

//Create mocked answer for request
followAPIMock.postUser.mockReturnValue(Promise.resolve(result))
followAPIMock.deleteUser.mockReturnValue(Promise.resolve(result))

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    followAPIMock.postUser.mockClear()
    followAPIMock.deleteUser.mockClear()
})

test('Follow dispatch started three times with right actions', async () => {
  const userId = 1
  const thunk = follow(userId)

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowing(true, userId))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccees(userId))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowing(false, userId))
})

test('Unfollow dispatch started three times with right actions', async () => {
  const userId = 2
  const thunk = unfollow(userId)

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowing(true, userId))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccees(userId))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowing(false, userId))
})
