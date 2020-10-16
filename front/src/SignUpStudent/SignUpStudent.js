import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUser } from '../store/action.js'
import './SignUpStudent.css';

const mapStateToProps = store => {
  return ({
  })
};

const mapDispatchToProps = {
  onSend: signUser
};




class SignUpStudent extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      email: "",
      firstname: "",
      lastname: "",
      phonenumber: "",
      ticket: "",
      year: "",
      password: "",
    }

    this.onChange1 = e => this.setState({ email: e.target.value})
    this.onChange2 = e => this.setState({ firstname: e.target.value})
    this.onChange3 = e => this.setState({ lastname: e.target.value})
    this.onChange4 = e => this.setState({ phonenumber: e.target.value})
    this.onChange5 = e => this.setState({ password: e.target.value})
    this.onChange7 = e => this.setState({ year: e.target.value})
    this.onChange8 = e => this.setState({ ticket: e.target.value})

  }
  render() {
    return (
      <div className="sign-box">
        <h1>Регистрация для студента</h1>
        <input required className="signuppage-input" type="text" value={this.state.email} onChange={this.onChange1} placeholder="Адрес электронной почты"></input>
        <input required className="signuppage-input" type="text" value={this.state.firstname} onChange={this.onChange2} placeholder="Имя"></input>
        <input required className="signuppage-input" type="text" value={this.state.lastname} onChange={this.onChange3} placeholder="Фамилия"></input>
        <input required className="signuppage-input" type="number" value={this.state.phonenumber} onChange={this.onChange4} placeholder="Номер телефона"></input>
        <input required className="signuppage-input" type="text" value={this.state.ticket} onChange={this.onChange8} placeholder="Номер студенческого билета"></input>
        <div className="dropdown-block">
          <p className="signuppage-course">Курс</p>
          <select onChange={this.onChange7}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <input required className="signuppage-input" type="password" value={this.state.password} onChange={this.onChange5} placeholder="Пароль"></input>
        <div className="signup-button-block">
          <button className="signuppage-signup-btn" disabled={(this.state.email.length>0 && this.state.password.length >0 && this.state.firstname.length >0 && this.state.lastname.length >0 && this.state.ticket.length>0 && this.state.phonenumber.length >0) ? (false) : (true)}
            onClick={() => this.props.onSend(this.state.email, this.state.firstname, this.state.lastname, this.state.year, this.state.phonenumber, this.state.ticket, this.state.password, "pending")}
          >Зарегистрироваться</button>
          <button className="signuppage-cancel-btn"><Link to="/" style={{ color: "white", textDecoration: 'none' }}>Отмена</Link></button>
        </div>
      </div>
    );
  }
}

let ConnectedSignUpStudent = connect(mapStateToProps, mapDispatchToProps)(SignUpStudent)

export default ConnectedSignUpStudent;