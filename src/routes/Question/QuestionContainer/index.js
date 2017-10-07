import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAnswersForQuestion } from '../../../api/'

import * as selectors from '../../../modules/questions/selectors'
import * as actions from '../../../modules/questions/actions'
import CircularProgress from 'material-ui/CircularProgress/'

import QuestionComponent from '../QuestionComponent/'
import cx from './QuestionContainer.module.scss'

class QuestionContainer extends Component {
  state = {
    isLoading: false,
    answers: [],
    isLoadingAnswers: false,
    has_more: false,
    page: 0
  }

  componentWillMount() {
    if (!this.props.question){
      this.fetchQuestion(this.props.questionId)
      return;
    }

    this.fetchAnswers(this.props.questionId, 1)
  }

  fetchQuestion = async questionId => {
    if (!questionId) return;
    
    this.setState({isLoading: true})

    try {
      await this.props.fetchQuestion(questionId)
      await this.fetchAnswers(questionId, 1);

      this.setState({
        isLoading: false
      })
    } catch(e){
      console.dir(e)
      this.setState({isLoading: false})
    }
  }

  fetchAnswers = async (questionId, page) => {
    if (!questionId) return;

    this.setState({
      isLoadingAnswers: true,
    })

    try{
      const { data } = await getAnswersForQuestion(questionId, page);

      this.setState(state => ({
        answers: state.answers.concat(data.items),
        isLoadingAnswers: false,
        has_more: data.has_more,
        page
      }))
      
    } catch(e){
      console.dir(e)

      this.setState({isLoadingAnswers: false})
    }
  }
  
  loadMoreAnswers = async () => {
    if (this.state.isLoadingAnswers || !this.state.has_more) return;
    
    this.setState({isLoadingAnswers: true});
    
    await this.fetchAnswers(this.props.questionId, this.state.page + 1)

    this.setState({isUpdatingList: false})
  }

  render() {
    const { isLoading, answers, isLoadingAnswers, has_more } = this.state;
    const { question } = this.props;
    const { loadMoreAnswers } = this;

    if (isLoading){
      return (
        <CircularProgress 
          size={70}
          thickness={7}
          className={cx('loader')}
        />
      )
    }

    return (
      <QuestionComponent 
        question={question}
        answers={answers}
        isLoadingAnswers={isLoadingAnswers}
        loadMoreAnswers={loadMoreAnswers}
        has_more={has_more}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  question: selectors.getQuestionById(state.questions, ownProps.questionId)
})

const mapActionCreators = {
  fetchQuestion: actions.fetchQuestion
}

export default connect(mapStateToProps, mapActionCreators)(QuestionContainer);