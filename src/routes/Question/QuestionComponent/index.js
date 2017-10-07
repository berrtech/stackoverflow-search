import React from 'react';
import pluralize from 'pluralize'
import cx from './QuestionComponent.module.scss';
import Item from './Item/';
import CircularProgress from 'material-ui/CircularProgress/'
import Waypoint from 'react-waypoint'


const QuestionComponent = ({question, answers, isLoadingAnswers, loadMoreAnswers, has_more}) => {
  return (
    <div
      className={cx('wrapper')}
    >
      <div className={cx('inner-wrapper')}>

        <Item 
          item={question}
        />

        <div className={cx('answer-count')}>
          {question.answer_count} {pluralize('answer', question.answer_count)}
        </div>

        {answers.map(answer => (
          <Item
            key={answer.answer_id}
            item={answer}
            style={{
              marginBottom: 20
            }}
          />
        ))}

        {has_more && (
          <Waypoint 
            onEnter={loadMoreAnswers}
          />
        )}

        {isLoadingAnswers && (
          <div
            className={cx('loader-wrapper')}
          >
            <CircularProgress 
              size={70}
              thickness={7}
            />
          </div>
        )}
        
      </div>
    </div>
  );
};

export default QuestionComponent;