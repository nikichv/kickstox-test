import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://newsapi.org/v2',
});

export default httpClient;
