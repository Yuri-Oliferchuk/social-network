import React from 'react';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
import Preloader from './common/preloader/Preloader';
import withRouter from './common/withRouter/withRouter';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Login from './components/Forms/login/Login';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import { initializeApp } from "./redux/app-reducer";


class App extends React.Component {
  
  componentDidMount = () => { this.props.initializeApp(); }

  render() {
  if (!this.props.initialized) {
    return <Preloader />
  }

  return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Routes>
            <Route path='/profile/:userId' element={<ProfileContainer />} />
            <Route path='/profile/' element={<ProfileContainer />} />
            <Route path='/dialogs/*' element={<DialogsContainer />} />
            <Route path='/users/*' element={<UsersContainer />} />
            <Route path='/login/' element={<Login />} />
          </Routes>
        </div>
      </div>
  )}
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized
  }
}

export default compose(
  withRouter,                              // for old React wersion, when router no work
  connect(mapStateToProps, { initializeApp })
)(App);;
