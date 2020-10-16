import React from 'react';
import { connect } from 'react-redux';
import './News.css';

const mapDispatchToProps = {
};




class News extends React.Component {


    state = {

    }
    componentDidMount() {
    }



    componentDidUpdate(prevProps, prevState) {
    }

    render() {
        const { news } = this.props;
        return (
            <div className="news-block">
                <h1 className="news-title">{news.title}</h1>
                <div className="news-photo-block">
                    <img src={news.photo} className="news-photo"></img>
                </div>
                <p className="news-description">{news.description}</p>
            </div>
        );
    }
}


let ConnectedNews = connect(null, mapDispatchToProps)(News);
export default ConnectedNews;