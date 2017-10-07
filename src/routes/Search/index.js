import React from 'react';
import qs from 'query-string';
import CircularProgress from 'material-ui/CircularProgress';

import cx from './Search.module.scss'

import SearchResults from './SearchResultsContainer'
import HomeButton from './HomeButton/'

export default class Search extends React.Component {
  handleHomeButtonClick = () => {
    this.props.history.push('/')
  }

  handleQuestionClick = questionId => {
    this.props.history.push(`/question/${questionId}`)
  }

  render(){
    const { location } = this.props;
    const { handleHomeButtonClick, handleQuestionClick } = this;

    const isLoading = false

    return (
      <div
        className={cx('wrapper')}
      >
        {isLoading && (
          <CircularProgress 
            size={70}
            thickness={7}
            className={cx('loader')}
          />
        )}

        {!isLoading && [
          <div 
            key='homebutton'
            className={cx('home-button-wrapper')}
          >
            <HomeButton 
              onClick={handleHomeButtonClick}
            />
          </div>,
          <SearchResults 
            key='searchresults'
            searchQuery={qs.parse(location.search).q}
            onQuestionClick={handleQuestionClick}
          />
        ]}
      </div>
    )
  }
}