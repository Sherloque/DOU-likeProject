import React from 'react';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import './VacancyPage.css';


const mapDispatchToProps = {
};




class Vacancy extends React.Component {
    state = {}
    componentDidMount() { }
    componentDidUpdate(prevProps, prevState) { }

    render() {
        const { vacancy } = this.props;
        console.log(vacancy)
        return (
            <>
                <div className="vacancy-block">
                    <div className="vacancyphoto-container">
                        <img class="vacancyphoto" src={vacancy.firmLogo}></img>
                    </div>
                    <div className="vacancy-info-block">
                        <p>{vacancy.vacancyName}</p>
                        <p>{vacancy.description}</p>
                        <p>{vacancy.email}</p>
                        <p>{vacancy.contactNumber}</p>
                        <p>{vacancy.address}</p>
                    </div>
                </div>
            </>
        );
    }
}


let ConnectedVacancy = connect(null, mapDispatchToProps)(Vacancy);
export default ConnectedVacancy;