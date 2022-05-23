import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
import Preloader from './common/preloader/Preloader';
import Login from './components/Forms/login/Login';
import Music from './components/Music/Music';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import { initializeApp } from "./redux/app-reducer";
import ProfileContainer from './components/Profile/ProfileContainer';
import { AppStoreType } from './redux/redux-store';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import { Users } from './components/Users/Users';

type MapPropsType = ReturnType< typeof mapStateToProps >
type DispatchPropsType = {initializeApp: () => void}

class App extends React.Component<MapPropsType & DispatchPropsType> {
  
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
          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route path='/' element={<Navigate to='/profile' />} />
              <Route path='/profile/:userId' element={<ProfileContainer />} />
              <Route path='/profile/' element={<ProfileContainer />} />
              <Route path='/dialogs/*' element={<DialogsContainer />} />
              <Route path='/users/*' element={<Users />} />
              <Route path='/login/' element={<Login />} />
              <Route path='/music/' element={<Music />} />
            </Routes>
          </Suspense>
        </div>
      </div>
  )}
}

const mapStateToProps = (state: AppStoreType) => {
  return {
    initialized: state.app.initialized
  }
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, { initializeApp })
)(App);;
