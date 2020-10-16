import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logUser } from '../store/action.js'
import './LoginPage.css';



const mapStateToProps = store => {
  return ({
  })
};

const mapDispatchToProps = {
  onSend: logUser
};




class LoginPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      login: "",
      password: "",
      valid: false,

    }
    this.onChange1 = e => this.setState({ login: e.target.value, valid: this.loginValidation(e.target.value) ? true : false })
    this.onChange2 = e => this.setState({ password: e.target.value, valid: this.passValidation(e.target.value) ? true : false })
    this.loginValidation = str => str.length > 0 && this.state.password.length > 0
    this.passValidation = str => str.length > 0 && this.state.login.length > 0
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
                <h1 className="login-header">Авторизация</h1>
                <input className="loginpage-login" type="text" value={this.state.login} onChange={this.onChange1} placeholder="Логин"></input>
                <input className="loginpage-password" type="password" value={this.state.password} onChange={this.onChange2} placeholder="Пароль"></input>
                <button className="loginpage-login-btn" disabled={!this.state.valid}
                  onClick={() => this.props.onSend(this.state.login, this.state.password)}
                >Войти</button>
                <button className="loginpage-signup-btn"><Link to="/signup" style={{ color: "white", textDecoration: 'none' }}>Зарегистрироваться</Link></button>
                <button className="loginpage-cancel-btn"><Link to="/" style={{ color: "white", textDecoration: 'none' }}>Отмена</Link></button>
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

let ConnectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage)

export default ConnectedLoginPage;