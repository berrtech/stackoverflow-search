import React from 'react';

import {
  Route,
} from 'react-router-dom'

import Home from './Home'
import Search from './Search'
import Question from './Question'

export default [
  <Route key='home' exact path="/" component={Home} />,
  <Route key='search' path="/search" component={Search} />,
  <Route key='question' path="/question/:questionId" component={Question} />
]