import React, { Component } from 'react';

import ResultsTable from '../ResultsTable/'

import withFetchLayer from '../QuestionsFetchLayer'

const Results = withFetchLayer(ResultsTable);

class QuickInfo extends Component {
  getTitle = () => {
    if (this.props.user){
      return `Top questions from ${this.props.user.display_name}:`
    }

    if (this.props.tag) {
      return `Top questions tagged '${this.props.tag}':`
    }

    return null
  }

  getFetchFunction = () => {
    if (this.props.user) return this.props.actions.getPopularQuestionsByUser;
    
    if (this.props.tag) return this.props.actions.search;

    return null;
  }

  getParams = () => {
    if (this.props.user){
      return {
        userId: this.props.user.user_id
      }
    }

    if (this.props.tag) {
      return {tagged: this.props.tag}
    }

    return null
  }
  
  render() {
    const { getTitle, getFetchFunction, getParams } = this;
    const { onAuthorClick, onTagClick, onQuestionClick} = this.props
    return (
      <Results 
        fetchFunction={getFetchFunction()}
        params={getParams()} 
        title={getTitle()} 
        onAuthorClick={onAuthorClick}
        onQuestionClick={onQuestionClick}
        onTagClick={onTagClick}
      />
    );
  }
}

export default QuickInfo;