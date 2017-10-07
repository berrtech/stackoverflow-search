import React from 'react';

import ResultsTable from './ResultsTable/'

import withFetchLayer from './QuestionsFetchLayer/'

import cx from './SearchResults.module.scss';
import QuickInfo from './QuickInfo'

const Results = withFetchLayer(ResultsTable);

export default class SearchResults extends React.Component{
  state = {
    showPanel: false,
    user: null,
    tag: null
  }

  getResultsWrapperStyle = () => {
    const { showPanel } = this.state;

    if(showPanel){
      return {
        transform: 'translate(0, 0)'
      }
    }

    return {
      transform: 'translate(50%, 0)'
    }
  }

  closePanel = () => this.setState({showPanel: false})

  getQuickInfoWrapperStyle = () => {
    const { showPanel } = this.state;
    
    if(showPanel){
      return {
        transform: 'translate(0, 0)'
      }
    }

    return {
      transform: 'translate(100%, 0)'
    }
  }

  handleAuthorClick = ({user_id, display_name}) => {
    this.setState({
      showPanel: true,
      tag: null,
      user:{
        user_id,
        display_name
      } 
    })
  }

  handleTagClick = tag => {
    this.setState({
      showPanel: true,
      tag,
      user: null
    })
  }

  handleQuestionClick = questionId => this.props.onQuestionClick(questionId)

  render(){
    const { searchQuery, actions } = this.props;
    const { 
      handleAuthorClick,
      handleTagClick, 
      getResultsWrapperStyle, 
      getQuickInfoWrapperStyle,
      handleQuestionClick,
      closePanel
    } = this;
    const { user, tag } = this.state;

    return (
      <div className={cx('wrapper')}>
        <div 
          className={cx('results-wrapper')}
          style={getResultsWrapperStyle()}
        >
          <Results
            title={`Questions matching '${searchQuery}':`} 
            fetchFunction={actions.search}
            params={{q: searchQuery}}
            onAuthorClick={handleAuthorClick} 
            onTagClick={handleTagClick}
            onQuestionClick={handleQuestionClick}
          />
        </div>

        <div 
          className={cx('quick-info-wrapper')}
          style={getQuickInfoWrapperStyle()}
        >
          <QuickInfo 
            user={user} 
            tag={tag}
            actions={actions}
            onAuthorClick={handleAuthorClick} 
            onTagClick={handleTagClick}
            onQuestionClick={handleQuestionClick}
            onClosePanel={closePanel}
          />
        </div>

      </div>
    )
  }
}