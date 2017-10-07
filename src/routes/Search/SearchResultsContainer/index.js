import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { search, getPopularQuestionsByUser } from '../../../modules/questions/actions';

import SearchResults from '../SearchResults/';

const mapActionCreators = dispatch => ({
  actions: bindActionCreators({
    search,
    getPopularQuestionsByUser 
  }, dispatch)
})

export default connect(null, mapActionCreators)(SearchResults)