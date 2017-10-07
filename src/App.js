import React from 'react'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import cx from './App.module.scss'
import routes from './routes'
import store from './store';
import { Provider } from 'react-redux';


const App = () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <Router>
        <div className={cx('app')}>
          {routes}
        </div>
      </Router>
    </MuiThemeProvider>
  </Provider>
)
export default App
