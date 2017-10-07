import { handleActions } from 'redux-actions';
import keyBy from 'lodash/keyBy'
import * as constants from './constants';

const initialState = {}

const addQuestions = (state, action) => ({
  ...state,
  ...keyBy(action.payload.result.data.items, 'question_id')
}) 

const handlers = {
  [constants.QUESTIONS_FETCH_SUCCESS]: addQuestions,
  [constants.QUESTION_FETCH_SUCCESS]: addQuestions
}

export default handleActions(handlers, initialState)