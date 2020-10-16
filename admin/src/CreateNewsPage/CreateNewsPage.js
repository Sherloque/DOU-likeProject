import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createNews } from '../store/action.js'


const mapStateToProps = store => {
    return ({
    })
};

const mapDispatchToProps = {
    onSend: createNews
  };




class CreateNewsPage extends React.Component {
    constructor(props) {
        super(props);
        this.newsRef = React.createRef();

        this.state = {
            title: '',
            description: '',
            photo: File,
        }

        this.onChange1 = e => this.setState({ title: e.target.value })
        this.onChange2 = e => this.setState({ description: e.target.value })
        this.onChange3 = e => this.setState({ photo:this.newsRef.current.files[0]}, console.log(this.newsRef.current.files[0]))
        this.FD  = new FormData();
    }
    render() {
        return (
            <>
                <div className="sign-box">
                    <h1>Создание новости</h1>
                    <input required type="text" value={this.state.title} onChange={this.onChange1} placeholder="Заголовок"></input>
                    <input required type="text" value={this.state.description} onChange={this.onChange2} placeholder="Описание"></input>
                    <input type="file" id="newsPhoto" onChange={this.onChange3} ref={this.newsRef}></input>
                    <button onClick={() => {
                    this.FD.append("title", this.state.title)
                    this.FD.append("description",  this.state.description)
                    this.FD.append("file", this.state.photo, this.state.photo.name)
                    this.props.onSend(this.FD ) }}>Создать</button>
                    <button><Link to="/" style={{ color: "white", textDecoration: 'none' }}>Отмена</Link></button>
                </div>
            </>
        );
    }
}

let ConnectedCreateNewsPage = connect(mapStateToProps, mapDispatchToProps)(CreateNewsPage)

export default ConnectedCreateNewsPage;