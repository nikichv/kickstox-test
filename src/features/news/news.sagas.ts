import { fork, put, spawn, take } from '@redux-saga/core/effects';
import getNews from 'api/endpoints/getNews';
import {
  fetchNewsSuccess,
  fetchNewsFail,
  fetchNewsRequest,
} from './news.store';

function* watchNewsFetchRequest(): unknown {
  while (true) {
    yield take(fetchNewsRequest);
    yield spawn(fetchNews);
  }
}

function* fetchNews() {
  const response = yield getNews({
    from: '2020-07-09',
    q: 'football',
    sortBy: 'publishedAt',
  });

  if (response.data.status === 'ok') {
    yield put(fetchNewsSuccess({ items: response.data.articles }));
  } else {
    yield put(fetchNewsFail());
  }
}

export default fork(watchNewsFetchRequest);
