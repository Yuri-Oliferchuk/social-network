import React, { useEffect, FC } from 'react'
import Users from './Users'
import { connect } from 'react-redux'
import { requestUsers, unfollow, follow, FilterType } from '../../redux/users-reducer'
import { compose } from 'redux'
import { getCurrentPage, getFollowingInProgres, getIsFetching, getPageSize, getTotalUsersCount, getUsers, getUserFilter } from '../../redux/users-selectors'
import { UserType } from '../../types/types'
import { AppStoreType } from '../../redux/redux-store'

type MapStatePropsType = {
  currentPage: number
  pageSize: number
  totalUsersCount: number
  isFetching: boolean
  users: Array<UserType>
  followingInProgres: Array<number>
  filter: FilterType
}

type MapDispatchPropsType = {
  requestUsers: (currentPage: number, pageSize: number, filter: FilterType) => any
  unfollow: (userId: number) => void
  follow: (userId: number) => void
}

type OwnPropsType = {
  pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const UsersAPIContainer: FC<PropsType> = React.memo((props) => {
  const { currentPage, pageSize, requestUsers, filter } = props

  useEffect(() => {
    requestUsers(currentPage, pageSize, filter)
  }, [requestUsers, currentPage, pageSize, filter])

  const onPageChanged = (page: number): void => {
    const { pageSize, filter } = props
    props.requestUsers(page, pageSize, filter)
  }

  const onFilterChanged = (filter: FilterType): void => {
    const { pageSize } = props
    props.requestUsers(1, pageSize, filter)
  }

  return (
    <>
      <Users
        totalUsersCount={props.totalUsersCount}
        onPageChanged={onPageChanged}
        onFilterChanged={onFilterChanged}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        users={props.users}
        isFetching={props.isFetching}
        followingInProgres={props.followingInProgres}
        unfollow={props.unfollow}
        follow={props.follow}
        pageTitle={props.pageTitle}
      />
    </>
  )
})

let mapStateToProps = (state: AppStoreType): MapStatePropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgres: getFollowingInProgres(state),
    filter: getUserFilter(state)
  }
}

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStoreType>(mapStateToProps, { unfollow, follow, requestUsers })
)(UsersAPIContainer)
