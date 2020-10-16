import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import './App.css';
import store from './store/store'
import history from './history/history';
import LoginPage from './LoginPage/LoginPage';
import SignUpPage from './SignUpPage/SignUpPage';
import DashboardPage from './DashboardPage/DashboardPage';
import MainPage from './MainPage/MainPage';
import CreateNewsPage from './CreateNewsPage/CreateNewsPage';
import NewsPage from './NewsPage/NewsPage';
import StudentsPage from './StudentsPage/StudentsPage';
import ProfilePage from './ProfilePage/ProfilePage';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div>
          <Route path="/login" component={LoginPage} exact />
          <Route path="/signup" component={SignUpPage} exact />
          <Route path="/dashboard" component={DashboardPage} exact />
          <Route path="/" component ={MainPage} exact />
          <Route path="/createnews" component ={CreateNewsPage} exact />
          <Route path ="/news" component = {NewsPage} exact />
          <Route path ="/students" component = {StudentsPage} exact />
          <Route path ="/profile/:userID" component = {ProfilePage} />
        </div>
      </Router>
    </Provider>
      );
    }
    
    export default App;
