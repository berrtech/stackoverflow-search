import React from 'react';
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress/'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import cx from './ResultsTable.module.scss'
import ReactHeight from 'react-height'
import Waypoint from 'react-waypoint';

import { COLUMN_WIDTHS } from './constants';
import Item from './Item/';

// hardcoded in material-ui component
const TABLE_HEADER_HEIGHT = 56;

//height for table title
const TITLE_HEIGHT = 51;

class ResultsTable extends React.Component{
  state = {
    height: 0
  }

  handleHeightChange = (height) => {
    this.setState({
      height: height - TABLE_HEADER_HEIGHT - TITLE_HEIGHT
    })
  }

  render(){
    const { 
      items, 
      onAuthorClick, 
      onTagClick, 
      title, 
      error, 
      onLoadMore,
      has_more,
      onQuestionClick
    } = this.props;

    const { height } = this.state;
    const { handleHeightChange } = this;

    return (
      <ReactHeight
        onHeightReady={handleHeightChange}
        className={cx('wrapper')}
      >

        <Paper
          zDepth={2}
          className={cx('inner-wrapper')}
        >
          <p className={cx('title')} style={{height: TITLE_HEIGHT}}>{title}</p>

          <Table
            selectable={false}
            fixedHeader={true}
            height={height + "px"}
            bodyStyle={{
              overflowX: 'hidden',
              overflowY: 'auto'
            }}
            
          >
            <TableHeader
              displaySelectAll={false}
              enableSelectAll={false}
              selectAllSelected={false}
              adjustForCheckbox={false}
            >
              <TableRow
                selectable={false}
                className={cx('header-row')}
              >
                <TableHeaderColumn
                  style={{
                    width: COLUMN_WIDTHS[0],
                    textAlign: 'center'
                  }}
                >
                  Author
                </TableHeaderColumn>
                <TableHeaderColumn
                  style={{
                    width: COLUMN_WIDTHS[1],
                    textAlign: 'center'
                  }}
                >
                  Question
                </TableHeaderColumn>
                <TableHeaderColumn
                  style={{
                    width: COLUMN_WIDTHS[2],
                    textAlign: 'center'
                  }}
                >
                  Answers
                </TableHeaderColumn>
                <TableHeaderColumn
                  style={{
                    width: COLUMN_WIDTHS[3]
                  }}
                >
                  Tags
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
            >
              {error && (
                <TableRow
                  key='error'
                  selectable={false}
                >
                  <TableRowColumn
                    colSpan='4'
                    style={{
                      textAlign: 'center'
                    }} 
                    className={cx('cell', 'error')}
                  >
                    {error.message}
                  </TableRowColumn>
                </TableRow>
              )}
              {items.map(item => (
                <Item 
                  key={item.question_id}
                  item={item}
                  onAuthorClick={onAuthorClick}
                  onQuestionClick={onQuestionClick}
                  onTagClick={onTagClick}
                />
              ))}
              
              {has_more && (
                <TableRow>
                  <TableRowColumn 
                    colSpan='4'
                    className={cx('loader-container')}
                  >
                    <Waypoint
                      onEnter={onLoadMore}
                    />

                    <CircularProgress
                      size={40}
                      thickness={4}
                    />
                  </TableRowColumn>
                </TableRow>
              )}
            </TableBody> 
          </Table>
        </Paper> 
      </ReactHeight>
    )
  }
}

export default ResultsTable
