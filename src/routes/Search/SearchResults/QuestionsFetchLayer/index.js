import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual'

import CircularProgress from 'material-ui/CircularProgress/'

import cx from './QuestionsFetchLayer.module.scss'

const createWrappedComponent = Component => {
  return class QuestionsFetchLayer extends React.Component {
    static propTypes = {
      fetchFunction: PropTypes.func,
      params: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    }

    constructor(props){
      super(props);

      this.state = this.getInitialState();
    }

    getInitialState = () => ({
      items: [],
      page: 0,
      has_more: false,
      // отвечает за начальную загрузку данных
      isLoading: false,
      // отвечает за подгрузку дополнительных страниц
      isUpdatingList: false
    })

    componentWillMount() {
      const { params, fetchFunction } = this.props;
  
      if (params && fetchFunction){
        this.fetchQuestions(fetchFunction, {...params, page: 1})
      }
    }

    componentDidUpdate(prevProps, prevState) {
      const currentParams = this.props.params;
      const prevParams = prevProps.params;

      const currentFetchFunction = this.props.fetchFunction;
      const prevFetchFunction = prevProps.fetchFunction;

      if (!isEqual(currentParams, prevParams) || currentFetchFunction !== prevFetchFunction){
        this.clearState();
        this.fetchQuestions(currentFetchFunction, {...currentParams, page: 1})
      }
    }
    
    clearState = () => {
      this.setState(this.getInitialState())
    }

    fetchQuestions = async (func, params) => {
      if (!params) return;
      
      this.setState({isLoading: true, error: null})
  
      try {
        const { data} = await func(params)

        this.setState(state => ({
          items: state.items.concat(data.items),
          page: state.page + 1,
          has_more: data.has_more,
          isLoading: false
        }))

        return data;
      } catch(e){
        console.dir(e)
        const { data } = e.response;

        this.setState({
          isLoading: false,
          error: {
            message: data.error_message
          }
        })

        return Promise.reject(e)
      }    
    }

    loadMore = async () => {
      if (this.state.isUpdatingList || !this.state.has_more) return;

      this.setState({isUpdatingList: true});


      await this.fetchQuestions(this.props.fetchFunction, {
        ...this.props.params,
        page: this.state.page + 1
       })

       this.setState({isUpdatingList: false})
    }

    render(){
      const { items, isLoading, error, has_more, isUpdatingList } = this.state;
      const { loadMore } = this;

      return [
        isLoading && !isUpdatingList && <div key='loader-ovelay' className={cx('loader-overlay')} />,
        isLoading && !isUpdatingList && (
          <CircularProgress 
            key='loader'
            size={70}
            thickness={7}
            className={cx('loader')}
          />
        ),
        <Component 
          key='component' 
          {...this.props} 
          items={items}
          error={error}
          onLoadMore={loadMore}
          has_more={has_more}
          isUpdatingList={isUpdatingList}
        />
      ]
    }
  }
}

export default component => createWrappedComponent(component)