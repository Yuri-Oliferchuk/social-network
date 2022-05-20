import { connect } from 'react-redux'
import { actions } from '../../../redux/profile-reducer'
import { AppStoreType } from '../../../redux/redux-store'
import MyPosts from './MyPosts'

const mapStateToProps = (state: AppStoreType) => {
  return {
    posts: state.profilePage.posts,
  }
}

const mapDispatchToProps = {
    addPost: actions.addPost
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer
