import axios from 'axios';
import qs from 'query-string';

const host = 'https://api.stackexchange.com';
const key = '6aBajh4L7T7n*6S)*p8DzA(('

const defaultParams = {
  site: 'stackoverflow',
  key,
  sort: 'votes',
  filter: 'withbody'
}

const defaultQuery = qs.stringify(defaultParams);

export const search = (params) => {
  const query = qs.stringify({
    ...defaultParams,
    ...params
  })

  return axios.get(`${host}/search/advanced?${query}`)
}

export const getPopularQuestionsByUser = ({userId, ...params}) => {
  const query = qs.stringify({
    ...defaultParams,
    ...params
  })

  return axios.get(`${host}/users/${userId}/questions?${query}`)
}

export const getAnswersForQuestion = (questionId, page) => {
  const query = qs.stringify({
    ...defaultParams,
    page
  });

  return axios.get(`${host}/questions/${questionId}/answers?${query}`)
}

export const getQuestion = questionId => {
  return axios.get(`${host}/questions/${questionId}?${defaultQuery}`)
}

