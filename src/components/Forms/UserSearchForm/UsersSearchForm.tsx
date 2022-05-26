import React, { FC } from 'react'
import style from './UsersSearchForm.module.css'
import { Formik, Form, Field } from 'formik'
import { FilterType } from '../../../redux/users-reducer'
import { useSelector } from 'react-redux'
import { getUserFilter } from '../../../redux/users-selectors'

const usersSearchFormValidate = (values: FormType) => {
  const errors = {}
  return errors
}

type Props = {
  onFilterChanged: (filter: FilterType) => void
}

type FriendFormType = 'true' | 'false' | 'null'

type FormType = {
  term: string
  friend: FriendFormType
}

export const UsersSearchForm: FC<Props> = ({ onFilterChanged }) => {

  const filter = useSelector(getUserFilter)
  
  const onSubmit = (values: FormType, { setSubmitting }) => {
    const filter: FilterType = {
      term: values.term,
      friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
    }
    onFilterChanged(filter)
    setSubmitting(false)
  }

  return (
    <div className={style.userSearchForm}>
      <Formik 
        enableReinitialize={true}
        initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType }} 
        validate={usersSearchFormValidate} 
        onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <Field type='text' name='term' />
            <Field name='friend' as='select'>
              <option value='null'>All</option>
              <option value='true'>Only followed</option>
              <option value='false'>Only unfollowed</option>
            </Field>
            <button type='submit' disabled={isSubmitting}>
              Find
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
