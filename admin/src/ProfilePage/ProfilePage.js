import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { attachRecommendation } from '../store/action.js'

const mapStateToProps = store => {
};

const mapDispatchToProps = {
    onSendRecommendation:attachRecommendation
};




class ProfilePage extends React.Component {
    componentDidMount() {

    }

    constructor(props) {
        super(props);
        
        this.state = {
            email: this.props.location.state.student.email,
            firstname: this.props.location.state.student.firstname,
            lastname: this.props.location.state.student.lastname,
            phonenumber: this.props.location.state.student.phonenumber,
            year: this.props.location.state.student.year,
            ticket: this.props.location.state.student.ticket,
            recommendation: this.props.location.state.student.recommendation
        }

        this.onChange1 = e => this.setState({ recommendation: e.target.value })


    }
    render() {
        const { student } = this.props.location.state
        console.log(this.props.location.state.student.firstname)
        console.log(this.state)
            return (
                <>
                <p className="input-label">Логин:<input className="profile-input" value={this.state.email}></input></p>
                    <p className="input-label">Имя:</p><p>{this.state.firstname}</p>
                    <p className="input-label">Фамилия:</p><p>{this.state.lastname}</p>
                    <p className="input-label">Курс:</p><p>{this.state.year}</p>
                    <p className="input-label">Номер студенческого:</p><p>{this.state.ticket}</p>
                    <p className="input-label">Номер телефона:</p><p>{this.state.phonenumber}</p>
                    <p>Рекомендация</p>
                    <textarea placeholder="рекомендация" value={this.state.recommendation} onChange={this.onChange1}></textarea>
                    <button onClick={() => this.props.onSendRecommendation(this.state.email, this.state.recommendation)}>Закрепить рекомендацию</button>
                    <button className=''><Link to="/students" style={{ color: "white", textDecoration: 'none' }}>Назад</Link></button>

                </>
            );
    }
}
let ConnectedProfilePage = connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
export default ConnectedProfilePage;