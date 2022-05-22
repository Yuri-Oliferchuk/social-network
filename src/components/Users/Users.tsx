import React, { FC } from 'react'
import style from './Users.module.css'
import Preloader from '../../common/preloader/Preloader'
import Paginator from '../../common/paginator/Paginator'
import User from './User/User'
import { UserType } from '../../types/types'
import { UsersSearchForm } from '../Forms/UserSearchForm/UsersSearchForm'
import { FilterType } from '../../redux/users-reducer'

type Props = {
  totalUsersCount: number
  pageSize: number
  onPageChanged: (pageNumber: number) => void
  onFilterChanged: (filter: FilterType) => void
  currentPage: number
  users: Array<UserType>
  followingInProgres: Array<number>
  isFetching: boolean
  unfollow: (userId: number) => void
  follow: (userId: number) => void
  pageTitle: string
}

const Users: FC<Props> = ({ totalUsersCount, pageSize, onPageChanged, currentPage, users, ...props }) => {
  return (
    <div>
      <UsersSearchForm onFilterChanged={props.onFilterChanged} />
      <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} onPageChanged={onPageChanged} currentPage={currentPage} portionSize={10} />
      {props.isFetching ? (
        <Preloader />
      ) : (
        <div className={style.usersList}>
          {users.map((u) => (
            <User user={u} followingInProgres={props.followingInProgres} unfollow={props.unfollow} follow={props.follow} key={u.id} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Users
