import { all } from '@redux-saga/core/effects';

import newsSaga from './features/news/news.sagas';

function* rootSaga(): unknown {
  yield all([newsSaga]);
}

export default rootSaga;
