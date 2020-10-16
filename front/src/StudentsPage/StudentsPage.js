import React from 'react';
import { connect } from 'react-redux';
import { fetchPendings } from '../store/action.js'
import { Link } from 'react-router-dom';
import { fetchStudents } from '../store/action.js'
import Student from './Student'
import jwt_decode from 'jwt-decode';
import { logoutUser } from '../store/action.js'
import './StudentsPage.css';

const mapStateToProps = store => {
    return ({
        students: store.studs.students

    }
    )
};


const mapDispatchToProps = {
    fetchStudents,
};

class StudentsPage extends React.Component {
    componentDidMount() {
        this.props.fetchStudents();

    }

    render() {
        const students = this.props.students.data
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
                            <h1 className="studentspage-heading">Студенты</h1>
                            <div className="studentspage-students-block">
                                {(students) ? students.map((item, i) => (
                                    <Student student={item}></Student>))
                                    : (<p className="load-placeholder">LOADING...</p>)
                                }
                            </div>
                        </div>
                    </div>
                    <aside className="right-sidebar"></aside>
                </div >
                <div className="main-footer">
                    <p className="mainpage-footer-text"> Copyright 2020. Made by Vladyslav Nadolko for research purposes only. vladnadolko.com</p>
                </div>
            </div>
        );
    }

}

let ConnectedStudentsPage = connect(mapStateToProps, mapDispatchToProps)(StudentsPage);

export default ConnectedStudentsPage;