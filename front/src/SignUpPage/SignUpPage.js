import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history/history';
import jwt_decode from 'jwt-decode';
import SignUpStudent from '../SignUpStudent/SignUpStudent';
import SignUpRecruiter from '../SignUpRecruiter/SignUpRecruiter';







class SignUpPage extends React.Component {


    constructor(props) {
        super(props);


        this.state = {
            checked: true,
        }

        this.onChange1 = e => this.setState({ checked: (this.state.checked == true) ? (false) : (true) }, console.log(this.state))
    }

    render() {
        return (
            <div className="page-container">
                <div className="main-header">
                    <div className="top-header-block">
                        <button className="mainpage-login-btn"><Link to="/login" style={{ color: "white", textDecoration: 'none' }}>Войти</Link></button>
                        <button className="mainpage-signup-btn"><Link to="/signup" style={{ color: "white", textDecoration: 'none' }}>Зарегистрироваться</Link></button>
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
                            <div className="mainpage-content-wrapper"></div>
                            <div className="login-box">
                                <input type="checkbox" onChange={this.onChange1} placeholder="смена"></input>
                                <label for="checkbox">Смена типа пользователя</label>
                                {(this.state.checked === true) ?
                                    (<SignUpStudent>
                                    </SignUpStudent>) :
                                    (<SignUpRecruiter></SignUpRecruiter>)}
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
    }

}

let ConnectedSignUpPage = connect(null, null)(SignUpPage);

export default ConnectedSignUpPage;
