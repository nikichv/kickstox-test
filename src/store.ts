import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import newsSlice from 'features/news/news.store';

import rootSaga from './sagas';

const rootReducer = combineReducers({
  news: newsSlice,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.count) {
      nextState.count = state.count; // preserve count value on client side navigation
    }
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

const createStore = (preloadedState = {}) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    preloadedState,
    reducer,
    enhancers: [],
    middleware: [sagaMiddleware],
    devTools: true,
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export type RootState = ReturnType<typeof rootReducer>;

// export an assembled wrapper
const wrapper = createWrapper<RootState>(createStore, { debug: false });

export default wrapper;
