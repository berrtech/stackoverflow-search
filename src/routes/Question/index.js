import React, { Component } from 'react';

import QuestionContainer from './QuestionContainer'

class Question extends Component {
  render() {
    const { questionId } = this.props.match.params

    return (
      <QuestionContainer 
        questionId={questionId}
      />
    );
  }
}

export default Question;