import * as constants from './constants';
import * as api from '../../api/'


export const search = params => ({
  types: [
    constants.QUESTIONS_FETCH,
    constants.QUESTIONS_FETCH_SUCCESS,
    constants.QUESTIONS_FETCH_FAIL,
  ],
  promise: () => api.search(params)
})

export const getPopularQuestionsByUser = params => ({
  types: [
    constants.QUESTIONS_FETCH,
    constants.QUESTIONS_FETCH_SUCCESS,
    constants.QUESTIONS_FETCH_FAIL,
  ],
  promise: () => api.getPopularQuestionsByUser(params)
})

export const fetchQuestion = questionId => ({
  types: [
    constants.QUESTION_FETCH,
    constants.QUESTION_FETCH_SUCCESS,
    constants.QUESTION_FETCH_FAIL,
  ],
  promise: () => api.getQuestion(questionId)
})