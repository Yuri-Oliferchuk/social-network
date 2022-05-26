import React, { FC, useEffect } from 'react'
import style from './Users.module.css'
import Preloader from '../../common/preloader/Preloader'
import Paginator from '../../common/paginator/Paginator'
import User from './User/User'
import { UsersSearchForm } from '../Forms/UserSearchForm/UsersSearchForm'
import { FilterType, follow, requestUsers, unfollow } from '../../redux/users-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentPage, getFollowingInProgres, getIsFetching, getPageSize, getTotalUsersCount, getUserFilter, getUsers } from '../../redux/users-selectors'
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'

type QueryTypes = {
  page?: string, 
  term?: string, 
  friend?: string
}

export const Users = () => {
  const totalUsersCount = useSelector(getTotalUsersCount)
  const pageSize = useSelector(getPageSize)
  const currentPage = useSelector(getCurrentPage)
  const users = useSelector(getUsers)
  const isFetching = useSelector(getIsFetching)
  const filter = useSelector(getUserFilter)
  const followingInProgres = useSelector(getFollowingInProgres)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  
  useEffect(() => {
    const parsed = queryString.parse(location.search) as QueryTypes

    let actualPage = currentPage
    if(parsed.page) actualPage = Number(parsed.page)
    let actualFilter = filter
    if(parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
    if(parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === 'null'? null: parsed.friend==='true'?true:false}

    dispatch(requestUsers(actualPage, pageSize, actualFilter))
  }, [])
  
  useEffect(() => {
    const querySearch = {} as QueryTypes
    if(!!filter.term) querySearch.term = filter.term
    if(filter.friend !== null) querySearch.friend = String(filter.friend)
    if(currentPage !== 1) querySearch.page = String(currentPage)

    navigate({
      pathname: '/users',
      search: queryString.stringify(querySearch)
    })
  }, [filter, currentPage])

  const onPageChanged = (page: number): void => {
    dispatch(requestUsers(page, pageSize, filter))
  }

  const onFilterChanged = (filter: FilterType): void => {
    dispatch(requestUsers(1, pageSize, filter))
  }

  const onFollow = (id: number) => {
    dispatch(follow(id))
  }

  const onUnfollow = (id: number) => {
    dispatch(unfollow(id))
  }

  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} onPageChanged={onPageChanged} currentPage={currentPage} portionSize={10} />
      {isFetching ? (
        <Preloader />
      ) : (
        <div className={style.usersList}>
          {users.map((u) => (
            <User user={u} followingInProgres={followingInProgres} unfollow={onUnfollow} follow={onFollow} key={u.id} />
          ))}
        </div>
      )}
    </div>
  )
}
