import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history/history';
import jwt_decode from 'jwt-decode';
import { logoutUser } from '../store/action.js'


const mapStateToProps = store => ({
    User: store.currentUser,
});




class AboutPage extends React.Component {
    render() {
        if (localStorage.token)
            return (
                <div className="page-container">
                    <div className="main-header">
                        <div className="top-header-block">
                            <div className="mainpage-header-greeting-box">
                                <h1 className="mainpage-header-greeting">Привет, {jwt_decode(localStorage.token).sub.firstname}</h1>
                                <button className="mainpage-logout-btn" onClick={logoutUser}>Выйти</button>
                            </div>
                        </div>
                        <div className="heading-block">
                            <h1 className="main-header-heading">Биржа трудоустройства студентов ФКН ХНУ им. В.Н. Каразина</h1>
                        </div>
                    </div>
                    <div className="mainpage-sidebar-wrapper">
                        <aside className="left-sidebar"></aside>
                        <div className="mainpage-main-box">
                            <div className="main-navigation">
                                {(jwt_decode(localStorage.token).sub.role === "recruiter") ? (
                                    <>
                                        <button className='mainpage-main-btn'><Link to="/" style={{ color: "white", textDecoration: 'none' }}>Главная</Link></button>
                                        <button className='mainpage-profile-btn'><Link to="/profile" style={{ color: "white", textDecoration: 'none' }}>Профиль</Link></button>
                                        <button className='mainpage-students-btn'><Link to="/students" style={{ color: "white", textDecoration: 'none' }}>Студенты</Link></button>
                                        <button className='mainpage-vacancies-btn'><Link to="/vacancies" style={{ color: "white", textDecoration: 'none' }}>Вакансии</Link></button>
                                        <button className='mainpage-createvacancy-btn'><Link to="/createvacancy" style={{ color: "white", textDecoration: 'none' }}>Создать вакансию </Link></button>
                                        <button className='mainpage-news-btn'><Link to="/news" style={{ color: "white", textDecoration: 'none' }}>Новости</Link></button>
                                        <button className='mainpage-info-btn'><Link to="/about" style={{ color: "white", textDecoration: 'none' }}>Полезная информация</Link></button>
                                        <button className='mainpage-connect-btn'><Link to="/contactus" style={{ color: "white", textDecoration: 'none' }}>Связь с нами</Link></button>

                                    </>
                                ) : (
                                        <>
                                            <button className='mainpage-main-btn'><Link to="/" style={{ color: "white", textDecoration: 'none' }}>Главная</Link></button>
                                            <button className='mainpage-profile-btn'><Link to="/profile" style={{ color: "white", textDecoration: 'none' }}>Профиль</Link></button>
                                            <button className='mainpage-vacancies-btn'><Link to="/vacancies" style={{ color: "white", textDecoration: 'none' }}>Вакансии</Link></button>
                                            <button className='mainpage-news-btn'><Link to="/news" style={{ color: "white", textDecoration: 'none' }}>Новости</Link></button>
                                            <button className='mainpage-info-btn'><Link to="/about" style={{ color: "white", textDecoration: 'none' }}>Полезная информация</Link></button>
                                            <button className='mainpage-connect-btn'><Link to="/contactus" style={{ color: "white", textDecoration: 'none' }}>Связь с нами</Link></button>
                                        </>
                                    )}

                            </div>
                            <div className="mainpage-content-wrapper">
                                <div className="mainpage-content">
                                    <div className="mainpage-text-block">
                                        <h2 className="mainpage-content-heading">Справка</h2>
                                        <p className="mainpage-info-paragraph">
                                            Здесь вы можете ознакомиться со справочной информацией о ресурсе. Сервис разработан для потенциальной помощи в трудоустройстве студентов ФКН им В.Н. Каразина.
                                            Сервис предназначен как для студентов, так и для рекрутеров. С помощью меню навигации пользователи сайта могут перемещаться по разделам. К разделам относятся "Новости", "Профиль", "Вакансии", "Студенты".
                                            В этих разделах размещена та или иная информация касательно трудоустройства студентов.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <aside className="right-sidebar"></aside>
                    </div>
                    <div className="main-footer">
                        <p className="mainpage-footer-text"> Copyright 2020. Made by Vladyslav Nadolko for research purposes only. vladnadolko.com</p>
                    </div>
                </div>
            );
        else {
            return (
                <div className="page-container">
                    <div className="main-header">
                        <div className="top-header-block">
                            <div className="top-header-button-block">
                                <button className="mainpage-login-btn"><Link to="/login" style={{ color: "white", textDecoration: 'none' }}>Войти</Link></button>
                                <button className="mainpage-signup-btn"><Link to="/signup" style={{ color: "white", textDecoration: 'none' }}>Зарегистрироваться</Link></button>
                            </div>
                        </div>
                        <div className="heading-block">
                            <h1 className="main-header-heading">Биржа трудоустройства студентов ФКН ХНУ им. В.Н. Каразина</h1>
                        </div>
                    </div>
                    <div className="mainpage-sidebar-wrapper">
                        <aside className="left-sidebar"></aside>
                        <div className="mainpage-main-box">
                            <div className="main-navigation">
                                <button className='mainpage-main-btn'><Link to="/" style={{ color: "white", textDecoration: 'none' }}>Главная</Link></button>
                                <button className='mainpage-news-btn'><Link to="/news" style={{ color: "white", textDecoration: 'none' }}>Новости</Link></button>
                                <button className='mainpage-info-btn'><Link to="/about" style={{ color: "white", textDecoration: 'none' }}>Полезная информация</Link></button>
                                <button className='mainpage-connect-btn'><Link to="/contactus" style={{ color: "white", textDecoration: 'none' }}>Связь с нами</Link></button>
                            </div>
                            <div className="mainpage-content-wrapper">
                                <div className="mainpage-content">
                                    <div className="mainpage-text-block">
                                        <h2 className="mainpage-content-heading">Добро пожаловать!</h2>
                                        <p className="mainpage-info-paragraph">
                                            Здесь вы можете ознакомиться со справочной информацией о ресурсе. Сервис разработан для потенциальной помощи в трудоустройстве студентов ФКН ХНУ им В.Н. Каразина.
                                            Сервис предназначен как для студентов, так и для рекрутеров. С помощью меню навигации пользователи сайта могут перемещаться по разделам. К разделам относятся "Новости", "Профиль", "Вакансии", "Студенты".
                                            В этих разделах размещена та или иная информация касательно трудоустройства студентов.
                                        </p>                                    </div>
                                </div>
                            </div>
                        </div>
                        <aside className="right-sidebar"></aside>
                    </div>
                    <div className="main-footer">
                        <p className="mainpage-footer-text"> Copyright 2020. Made by Vladyslav Nadolko for research purposes only. vladnadolko.com</p>
                    </div>
                </div>
            )
        }
    }

}

let ConnectedAboutPage = connect(mapStateToProps)(AboutPage);

export default ConnectedAboutPage;