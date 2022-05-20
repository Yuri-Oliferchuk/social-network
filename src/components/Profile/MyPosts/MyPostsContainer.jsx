import { connect } from 'react-redux'
import { actions } from '../../../redux/profile-reducer'
import MyPosts from './MyPosts'

const mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
    // profile: state.profilePage.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (post) => {
      dispatch(actions.addPost(post))
    }
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer
