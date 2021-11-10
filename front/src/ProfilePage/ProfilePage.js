import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { changeStudentInfo } from '../store/action.js'
import { changeRecruiterInfo } from '../store/action.js'
import { fetchRecruitersVacancies } from '../store/action.js'
import { deleteVacancy } from '../store/action.js'
import { logoutUser } from '../store/action.js'
import Upload from '../Upload/Upload';
import '../MainPage/MainPage.css';
import './ProfilePage.css';

const mapStateToProps = store => {
    if (jwt_decode(localStorage.token).sub.role === "recruiter") {
        return ({
            vacancies: store.vacs.recruitersVacancies
        })
    }
};

const mapDispatchToProps = {
    onSendStudent: changeStudentInfo,
    onSendRecruiter: changeRecruiterInfo,
    fetchRecruitersVacancies,
    onSendDeleteVacancy: deleteVacancy,
};

export const ProfilePage = () => {
    const [email, setEmail] = useState((localStorage.token) ? jwt_decode(localStorage.token).sub.email : "");
    const [password, setPassword] = useState("");
    const [verpass, setVerpass] = useState("");
    const [firstname, setFirstname] = useState((localStorage.token) ? jwt_decode(localStorage.token).sub.firstname : "");
    const [lastname, setLastname] = useState((localStorage.token) ? jwt_decode(localStorage.token).sub.lastname : "");
    const [phonenumber, setPhonenumber] = useState((localStorage.token) ? jwt_decode(localStorage.token).sub.phonenumber : "");
    const [year, setYear] = useState((jwt_decode(localStorage.token).sub.role === "student") ? jwt_decode(localStorage.token).sub.year : "");
    const [ticket, setTicket] = useState((jwt_decode(localStorage.token).sub.role === "student") ? jwt_decode(localStorage.token).sub.ticket : "");
    const [recommendation, setRecommendation] = useState((jwt_decode(localStorage.token).sub.role === "student") ? jwt_decode(localStorage.token).sub.recommendation : "");
    const [photo, setPhoto] = useState((jwt_decode(localStorage.token).sub.role === "student") ? jwt_decode(localStorage.token).sub.photo : "");
    const [valid, setValid] = useState(true);
    const [validPass, setValidPass] = useState(true);
    const [showUpload, setShowUpload] = useState(false);

    useEffect(() => {
        if (jwt_decode(localStorage.token).sub.role === "recruiter") {
            this.props.fetchRecruitersVacancies(email)
        }
    }, [])

    useEffect(() => {
        const photoChange = (pic) => { setPhoto({ photo: pic }) }
    })

    const onMailChange = e => {
        setEmail({ email: e.target.value }, setValid(validateProfileLogin(e.target.value) ? true : false))
    }
    const onPassChange = e => {
        setPassword({ password: e.target.value }, setValidPass(validatePass(e.target.value) ? true : false))
    }
    const onVerpasChange = e => {
        setVerpass({ verpass: e.target.value }, setValidPass(validateVerpass(e.target.value) ? true : false))
    }
    const validateProfileLogin = str => str.length > 0 && (lastname.length > 0) && firstname.length > 0
    const validatePass = str => str === verpass
    const validateVerpass = str => str === password

    if (jwt_decode(localStorage.token).sub.role === "student")
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
                                    <button><Link to="/createvacancy" style={{ color: "white", textDecoration: 'none' }}>Создать вакансию </Link></button>
                                    <button><Link to="/students" style={{ color: "white", textDecoration: 'none' }}>Студенты</Link></button>
                                </>
                            ) : (
                                null
                            )}
                            <button className='mainpage-main-btn'><Link to="/" style={{ color: "white", textDecoration: 'none' }}>Главная</Link></button>
                            <button className='mainpage-profile-btn'><Link to="/profile" style={{ color: "white", textDecoration: 'none' }}>Профиль</Link></button>
                            <button className='mainpage-vacancies-btn'><Link to="/vacancies" style={{ color: "white", textDecoration: 'none' }}>Вакансии</Link></button>
                            <button className='mainpage-news-btn'><Link to="/news" style={{ color: "white", textDecoration: 'none' }}>Новости</Link></button>
                            <button className='mainpage-info-btn'><Link to="/about" style={{ color: "white", textDecoration: 'none' }}>Полезная информация</Link></button>
                            <button className='mainpage-connect-btn'><Link to="/contactus" style={{ color: "white", textDecoration: 'none' }}>Связь с нами</Link></button>
                        </div>
                        <div className="mainpage-content-wrapper">
                            <h1 className="profilepage-heading">Профиль</h1>
                            <div className="profile-box">
                                <div className="profilepage-photoblock">
                                    {photo && <div className="profilepage-logo-block">
                                        <img className="profilepage-userimg" src={photo}></img>
                                    </div>
                                    }
                                    {(photo != "") ? (<button className="profilepage-changephotobtn" onClick={() => setShowUpload(true)}>Изменить фотографию</button>) : (<Upload></Upload>)}
                                    {(showUpload === true) ? (<div className="profilepage-upload-block"><Upload></Upload> <button className="profilepage-cancel-button" onClick={() => setShowUpload(false)}>Отмена</button></div>) : (null)}
                                </div>
                                <div className="profilepage-infoblock">
                                    <p className="profilepage-input-label-first">Логин:<input className="profile-input" value={email} onChange={onMailChange}></input></p>
                                    <div className="profilepage-simple-info">
                                        <p className="profilepage-input-label">Имя: </p>
                                        <p className="profilepage-info-p">{firstname}</p>
                                    </div>
                                    <div className="profilepage-simple-info">
                                        <p className="profilepage-input-label">Фамилия: </p>
                                        <p className="profilepage-info-p">{lastname}</p>
                                    </div>
                                    <div className="profilepage-simple-info">
                                        <p className="profilepage-input-label">Курс: </p>
                                        <p className="profilepage-info-p">{year}</p>
                                    </div>
                                    <div className="profilepage-simple-info">
                                        <p className="profilepage-input-label">Номер студенческого: </p>
                                        <p className="profilepage-info-p">{ticket}</p>
                                    </div>
                                    <div className="profilepage-simple-info">
                                        <p className="profilepage-input-label">Номер телефона: </p>
                                        <p className="profilepage-info-p">+380XX-XX-XX-XXX</p>
                                    </div>
                                    <div className="profilepage-simple-info">
                                        <p className="profilepage-input-label">Рекомендация: </p>
                                        <p className="profilepage-info-p">{recommendation}</p>
                                    </div>
                                    <div className="profilepage-changepassword-block">
                                        <div className="profilepage-pswrd-inputblock">
                                            <p className="profilepage-input-label">Новый пароль (опционально): <input className="profile-input" value={password} type="password" onChange={onPassChange}></input></p>
                                        </div>
                                        <div className="profilepage-pswrd-inputblock">
                                            <p className="profilepage-input-label">Повторите новый пароль: <input className="profile-input" value={verpass} type="password" onChange={onVerpasChange}></input></p>
                                        </div>
                                    </div>
                                    <div className='profilepage-change-block'>
                                        <button className="profilepage-change" disabled={!(valid && validPass)}
                                            onClick={() => changeStudentInfo(jwt_decode(localStorage.token).sub._id, email, (password) ? (password) : null)}
                                        >Изменить данные</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <aside className="right-sidebar"></aside>
                </div>
                <div className="main-footer">
                    <p className="mainpage-footer-text"> Copyright 2020-2021. Made by Vladyslav Nadolko for research purposes only. vladnadolko.com</p>
                </div>
            </div>
        );
    else {
        const vacancies = this.props.vacancies.data
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
                                null
                            )}
                        </div>
                        <div className="mainpage-content-wrapper">
                            <h1 className="profilepage-heading">Профиль</h1>
                            <div className="profile-box-recruiter">
                                <div className="profilepage-recruiter-infoblock">
                                    <div className="profilepage-simple-info">
                                        <p className="profilepage-input-label-first">Логин:</p>
                                        <p className="profilepage-info-p">{email}</p>
                                    </div>
                                    <div className="profilepage-simple-info">
                                        <p className="profilepage-input-label">Имя:</p>
                                        <p className="profilepage-info-p">{firstname}</p>
                                    </div>
                                    <div className="profilepage-simple-info">
                                        <p className="profilepage-input-label">Фамилия:</p>
                                        <p className="profilepage-info-p">{lastname}</p>
                                    </div>
                                    <div className="profilepage-simple-info">
                                        <p className="profilepage-input-label">Номер телефона:</p>
                                        <p className="profilepage-info-p"> {phonenumber}</p>
                                    </div>
                                    <div className="profilepage-changepassword-block">
                                        <div className="profilepage-pswrd-inputblock">
                                            <p className="profilepage-input-label">Новый пароль (опционально):<input className="profile-input" value={password} type="password" onChange={onPassChange}></input></p>
                                        </div>
                                        <div className="profilepage-pswrd-inputblock">
                                            <p className="profilepage-input-label">Повторите новый пароль:<input className="profile-input" value={verpass} type="password" onChange={onVerpasChange}></input></p>
                                        </div>
                                    </div>
                                    <button disabled={!(valid && validPass)}
                                        onClick={() => this.props.onSendRecruiter(jwt_decode(localStorage.token).sub._id, (password) ? (password) : null)}
                                    >Изменить данные</button>
                                    <button><Link to="/" style={{ color: "black", textDecoration: 'none' }}>На главную</Link></button>
                                </div>
                                <div className="profilepage-vacancy-block">
                                    <div className="profilepage-pendingvacancies-block">
                                        <p>Вакансии ожидающие подтверждения</p>
                                        {(vacancies) ? vacancies.pendingvacs.map((item, i) => (<div key={i}><p></p>
                                            <img className="profilepage-firmlogo" src={item.firmLogo}></img>
                                            <p>Название вакансии: {item.vacancyName}</p>
                                            <p>Описание работы: {item.description}</p>
                                            <p>Адрес фирмы: {item.address}</p>
                                            <p>Электронная почта: {item.email}</p>
                                            <p>Контактный номер: +380XX-XX-XX-XXX</p>
                                            <button onClick={() => { this.props.onSendDeleteVacancy(item._id); this.props.fetchRecruitersVacancies(email) }}
                                            >Удалить вакансию</button></div>
                                        ))
                                            : (<p className="load-placeholder">LOADING...</p>)
                                        }
                                    </div>
                                    <div className="profilepage-verifiedvacancies-block">
                                        <p>Подтвержденные вакансии</p>
                                        {(vacancies) ? vacancies.verifiedvacs.map((item, i) => (<div className="profilepage-vacancy" key={i}><p></p>
                                            <img className="profilepage-firmlogo" src={item.firmLogo}></img>
                                            <p>Название вакансии: {item.vacancyName}</p>
                                            <p>Описание работы: {item.description}</p>
                                            <p>Адрес фирмы: {item.address}</p>
                                            <p>Электронная почта: {item.email}</p>
                                            <p>Контактный номер: +380XX-XX-XX-XXX</p>
                                            <button className="remove-vacancy-button" onClick={() => { this.props.onSendDeleteVacancy(item._id); this.props.fetchRecruitersVacancies(email) }}
                                            >Удалить вакансию</button></div>
                                        ))
                                            : (<p className="load-placeholder">LOADING...</p>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <aside className="right-sidebar"></aside>
                </div>
                <div className="main-footer">
                    <p className="mainpage-footer-text"> Copyright 2020-2021. Made by Vladyslav Nadolko for research purposes only. vladnadolko.com</p>
                </div>
            </div>
        )
    }
}
let ConnectedProfilePage = connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
export default ConnectedProfilePage;