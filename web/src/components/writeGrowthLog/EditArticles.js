import React, {Component} from 'react';
import {Card, Row, Col, Input} from 'antd';
import {connect} from 'react-redux';

const {TextArea} = Input;

class EditArticles extends Component {

    constructor() {
        super();
        this.state = {
            growthLog: "",
            displaySpecifiedArticle: -1
        }
    }

    handleWriteGrowthLogBlur(event) {
        this.props.getEditContent(event.target.value);
        this.setState({
            growthLog: event.target.value
        })
    }


    render() {
        if (this.state.displaySpecifiedArticle !== this.props.displaySpecifiedArticle) {
            this.setState({
                displaySpecifiedArticle: this.props.displaySpecifiedArticle,
                growthLog:this.props.articleContent
            })
        }
        return (
            <div>
                <TextArea rows={20} value={this.state.growthLog} onChange={this.handleWriteGrowthLogBlur.bind(this)}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        displaySpecifiedArticle: state.Student.displaySpecifiedArticle
    }
};

export default connect(mapStateToProps)(EditArticles);
