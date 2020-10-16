import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import './App.css';
import store from './store/store'
import history from './history/history';
import MainPage from './MainPage/MainPage';
import SignUpPage from './SignUpPage/SignUpPage';
import LoginPage from './LoginPage/LoginPage';
import CreateVacancyPage from './CreateVacancyPage/CreateVacancyPage';
import VacanciesPage from './VacanciesPage/VacanciesPage';
import StudentsPage from './StudentsPage/StudentsPage'
import NewsPage from './NewsPage/NewsPage'
import ProfilePage from './ProfilePage/ProfilePage'
import AboutPage from './AboutPage/AboutPage'
import ContactPage from './ContactPage/ContactPage'

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div>
        <Route path="/" component={MainPage} exact />
        <Route path="/signup" component={SignUpPage} exact />
        <Route path="/login" component={LoginPage} exact />
        <Route path="/createvacancy" component ={CreateVacancyPage} exact />
        <Route path="/vacancies" component ={VacanciesPage} exact />
        <Route path="/students" component = {StudentsPage} exact />
        <Route path="/news" component = {NewsPage} exact />
        <Route path="/profile" component = {ProfilePage} exact />
        <Route path="/about" component = {AboutPage} exact />
        <Route path="/contactus" component = {ContactPage} exact />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
