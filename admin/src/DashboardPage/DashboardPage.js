import React from 'react';
import { connect } from 'react-redux';
import { fetchPendings } from '../store/action.js'
import { Link } from 'react-router-dom';
//import { fetchRecruiters } from '../store/action.js'
import { verifyStudent } from '../store/action.js'
import { deleteStudent } from '../store/action.js'
import { verifyRecruiter } from '../store/action.js'
import { deleteRecruiter } from '../store/action.js'
import { verifyVacancy } from '../store/action.js'
import { deleteVacancy } from '../store/action.js'


const mapStateToProps = store => {
    return ({
        pendingData: store.pendings.pendings,

    }//,console.log(store.pendings.pendings)
    )
};


const mapDispatchToProps = {
    fetchPendings,
    verifyStudent,
    deleteStudent,
    verifyRecruiter,
    deleteRecruiter,
    verifyVacancy,
    deleteVacancy
};

class DashboardPage extends React.Component {
    componentDidMount() {
        this.props.fetchPendings();

    }

    render() {
        const pendings = this.props
        return (
            <><p className="pendingblock-name">Студенты, ожидающие подтверждения</p>
                {(pendings.pendingData.data) ? (pendings.pendingData.data.pendingstuds.map((item, i) => (<div><p>{item.email},{item.firstname} {item.lastname}</p>
                    <button className="verify-btn" onClick={() => { this.props.verifyStudent(item.email); this.props.fetchPendings() }}>Подтвердить</button>
                    <button className="delete-btn" onClick={() => { this.props.deleteStudent(item._id); this.props.fetchPendings() }}>Удалить</button></div>)))
                    : (<p className="load-placeholder">Загрузка...</p>)
                }
                <p className="pendingblock-name">Студенты, ожидающие подтверждения</p>
                {(pendings.pendingData.data) ? (pendings.pendingData.data.pendingrecrs.map((item, i) => (<div><p>{item.email},{item.firstname} {item.lastname}</p>
                    <button className="verify-btn" onClick={() => { this.props.verifyRecruiter(item.email); this.props.fetchPendings() }}>Подтвердить</button>
                    <button className="delete-btn" onClick={() => { this.props.deleteRecruiter(item._id); this.props.fetchPendings() }}>Удалить</button></div>)))
                    : (<p className="load-placeholder">Загрузка...</p>)
                }
                <p className="pendingblock-name">Студенты, ожидающие подтверждения</p>
                {(pendings.pendingData.data) ? (pendings.pendingData.data.pendingvacs.map((item, i) => (<div><p>{item.vacancyName}, {item.email}</p> <img src={item.firmLogo}></img>
                    <button className="verify-btn" onClick={() => { this.props.verifyVacancy(item.email, item.vacancyName, item.description); this.props.fetchPendings() }}>Подтвердить</button>
                    <button className="delete-btn" onClick={() => { this.props.deleteVacancy(item._id); this.props.fetchPendings() }}>Удалить</button></div>)))
                    : (<p className="load-placeholder">Загрузка...</p>)
                }
                <button className='btn-to-main'><Link to="/" style={{ color: "white", textDecoration: 'none' }}>На главную</Link></button>
            </>
        );
    }

}

let ConnectedDashboardPage = connect(mapStateToProps, mapDispatchToProps)(DashboardPage);

export default ConnectedDashboardPage;