import React from 'react';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { decodeHtml } from '../../../../../helpers'

import FlatButton from 'material-ui/FlatButton/'

import { COLUMN_WIDTHS } from '../constants'

import cx from '../ResultsTable.module.scss';

export default ({item, onAuthorClick, onQuestionClick, onTagClick}) => (
  <TableRow
    selectable={false}
  >
    <TableRowColumn
      style={{
        width: COLUMN_WIDTHS[0],
        textAlign: 'center'
      }} 
      className={cx('cell')}
    >
      {onAuthorClick && (
        <FlatButton
          className={cx('button')}
          onClick={() => onAuthorClick(item.owner)}
        >
          {decodeHtml(item.owner.display_name)}
        </FlatButton>
      )}
      {!onAuthorClick && decodeHtml(item.owner.display_name)}
    </TableRowColumn>
    <TableRowColumn 
      style={{
        width: COLUMN_WIDTHS[1]
      }} 
      className={cx('cell')}
    >
      {onQuestionClick && (
        <FlatButton
          className={cx('button')}
          onClick={() => onQuestionClick(item.question_id)}
        >
          {decodeHtml(item.title)}
        </FlatButton>
      )}
      {!onQuestionClick && decodeHtml(item.title)}
    </TableRowColumn>
    <TableRowColumn 
      style={{
        width: COLUMN_WIDTHS[2],
        textAlign: 'center'
      }} 
      className={cx('cell')}
    >
      {onQuestionClick && (
        <FlatButton
          className={cx('button')}
          onClick={() => onQuestionClick(item.question_id)}
        >
          {item.answer_count}
        </FlatButton>
      )}
      {!onQuestionClick && item.answer_count}
    </TableRowColumn>
    <TableRowColumn 
      style={{
        width: COLUMN_WIDTHS[3]
      }} 
      className={cx('cell')}
    >
      {onTagClick && item.tags && item.tags.map(tag => (
        <FlatButton 
          key={tag}
          className={cx('button')}
          onClick={() => onTagClick(tag)}
        >
          {tag}
        </FlatButton>
      ))}
      {!onTagClick && item.tags && item.tags.join(', ')}
    </TableRowColumn>
  </TableRow>
)