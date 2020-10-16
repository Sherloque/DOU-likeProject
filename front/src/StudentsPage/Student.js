import React from 'react';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import './StudentsPage.css';

const mapDispatchToProps = {
};




class Student extends React.Component {
    state = {}
    componentDidMount() { }
    componentDidUpdate(prevProps, prevState) { }

    render() {
        const { student } = this.props;
        console.log(student);
        return (
            <>
                <div className="student-block">
                    <div className="studentsphoto-container">
                        <img className="studentsphoto-img" src={student.photo}></img>
                    </div>
                    <p className="stud-p">{student.firstname} {student.lastname}</p>
                    <p className="stud-p">{student.year} курс</p>
                    <p className="stud-p">{student.email}</p>
                    <p className="stud-p">+380XX-XX-XX-XXX</p>
                    <p className="stud-p">{student.recommendation}</p>
                </div>
            </>
        );
    }
}


let ConnectedStudent = connect(null, mapDispatchToProps)(Student);
export default ConnectedStudent;