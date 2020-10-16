import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import history from '../history/history';
import { createVacancy } from '../store/action.js'
import { logoutUser } from '../store/action.js'
import './CreateVacancyPage.css';

const mapStateToProps = store => ({
});

const mapDispatchToProps = {
    onSend: createVacancy
};



class CreateVacancyPage extends React.Component {
    constructor(props) {
        super(props)
        this.logoRef = React.createRef();

        this.state = {
            vacancyName: "",
            description: "",
            firmScope: "",
            firmLogo: File,
            firmName: "",
            address: "",
            contactNumber: (localStorage.token) ? jwt_decode(localStorage.token).sub.phonenumber : "",
            email: (localStorage.token) ? jwt_decode(localStorage.token).sub.email : "",
            website: "",
        }

        this.onChange1 = e => this.setState({ vacancyName: e.target.value })
        this.onChange2 = e => this.setState({ description: e.target.value })
        this.onChange3 = e => this.setState({ firmScope: e.target.value })
        this.onChange4 = e => this.setState({ firmLogo: this.logoRef.current.files[0] }, console.log(this.logoRef.current.files[0]))
        this.onChange5 = e => this.setState({ firmName: e.target.value })
        this.onChange6 = e => this.setState({ address: e.target.value })
        this.onChange7 = e => this.setState({ contactNumber: e.target.value })
        this.onChange8 = e => this.setState({ email: e.target.value })
        this.onChange9 = e => this.setState({ website: e.target.value })
        this.FD = new FormData();
    }
    render() {
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
                            <div className="createvacancy-content-box">
                                <h1 className="createvacancy-heading">Создание вакансии</h1>
                                <div className="createvacancy-simple-info">
                                    <p className="createvacancy-info">Название вакансии</p>
                                    <input className="createvacancy-input" type="text" value={this.state.vacancyName} onChange={this.onChange1}></input>
                                </div>
                                <div className="createvacancy-simple-info">
                                    <p className="createvacancy-info">Описание</p>
                                    <input className="createvacancy-input" type="text" value={this.state.description} onChange={this.onChange2} ></input>
                                </div>
                                <div className="createvacancy-simple-info">
                                    <p className="createvacancy-info">Сфера деятельности компании</p>
                                    <input className="createvacancy-input" type="text" value={this.state.firmScope} onChange={this.onChange3}></input>
                                </div>
                                <div className="createvacancy-simple-info">
                                    <p className="createvacancy-info">Логотип фирмы</p>
                                    <input className="createvacancy-photoinput" type="file" id="firmLogo" onChange={this.onChange4} ref={this.logoRef}></input>
                                </div>
                                <div className="createvacancy-simple-info">
                                    <p className="createvacancy-info">Название компании</p>
                                    <input className="createvacancy-input" type="text" value={this.state.firmName} onChange={this.onChange5}></input>
                                </div>
                                <div className="createvacancy-simple-info">
                                    <p className="createvacancy-info">Адрес</p>
                                    <input className="createvacancy-input" type="text" value={this.state.address} onChange={this.onChange6}></input>
                                </div>
                                <div className="createvacancy-simple-info">
                                    <p className="createvacancy-info">Кoнтактный телефон</p>
                                    <input className="createvacancy-input" type="text" value={this.state.contactNumber} onChange={this.onChange7}></input>
                                </div>
                                <div className="createvacancy-simple-info">
                                    <p className="createvacancy-info">Электронный адрес</p>
                                    <input className="createvacancy-input" type="text" value={this.state.email} onChange={this.onChange8}></input>
                                </div>
                                <div className="createvacancy-simple-info">
                                    <p className="createvacancy-info">Веб-сайт</p>
                                    <input className="createvacancy-input" type="text" value={this.state.website} onChange={this.onChange9}></input>
                                </div>
                                <button className="createvacancy-submit-button" onClick={() => {
                                    //this.state.vacancyName, this.state.description, this.state.firmScope, this.state.firmLogo, this.state.firnName, this.state.address, this.state.contactNumber, this.state.email, this.state.website, "pending"
                                    this.FD.append("vacancyName", this.state.vacancyName)
                                    this.FD.append("description", this.state.description)
                                    this.FD.append("firmScope", this.state.firmScope)
                                    this.FD.append("file", this.state.firmLogo, this.state.firmLogo.name)
                                    this.FD.append("firmName", this.state.firmName)
                                    this.FD.append("address", this.state.address)
                                    this.FD.append("contactNumber", this.state.contactNumber)
                                    this.FD.append("email", this.state.email)
                                    this.FD.append("website", this.state.website)
                                    this.FD.append("status", "pending")
                                    console.log(typeof this.state.firmLogo)
                                    this.props.onSend(this.FD)
                                }}>Отправить</button>
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

let ConnectedCreateVacancyPage = connect(mapStateToProps, mapDispatchToProps)(CreateVacancyPage);

export default ConnectedCreateVacancyPage;