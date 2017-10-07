import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import cx from './Home.module.scss'

export default class Home extends React.Component{
  state = {
    searchQuery: ""
  }

  handleChange = e => this.setState({searchQuery: e.target.value})

  handleInputMount = ref => {
    if (!ref) return;
    ref.focus()
  }

  handleSubmit = e => {
    e.preventDefault();

    const { searchQuery } = this.state;

    if (!searchQuery.length) return;

    this.props.history.push('/search?q=' + searchQuery)
  }

  render(){
    const { searchQuery } = this.state;
    const { handleChange, handleInputMount, handleSubmit } = this;

    return (
      <div className={cx('wrapper')}>
        <form 
          className={cx('inner-wrapper')}
          onSubmit={handleSubmit}
        >
          <TextField 
            //focus on mount
            ref={handleInputMount}
            name='searchQuery'
            value={searchQuery}
            onChange={handleChange}
            style={{
              width: '100%'
            }}

          />
          <RaisedButton 
            label="Go!" 
            primary={true}
            type='submit'
            className={cx('button')} 
          />
        </form>
      </div>
    )
  }
}