import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiNewsItem } from '../../global';

export interface NewsStoreState {
  items: ApiNewsItem[];
  isPending: boolean;
  isError: boolean;
}

const initialState: NewsStoreState = {
  items: [],
  isPending: true,
  isError: false,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    fetchNewsRequest(state) {
      state.isError = false;
      state.isPending = true;
    },
    fetchNewsSuccess(state, action: PayloadAction<{ items: ApiNewsItem[] }>) {
      state.isPending = false;
      state.isError = false;
      state.items = [...state.items, ...action.payload.items];
    },
    fetchNewsFail(state) {
      state.isError = true;
      state.isPending = false;
    },
  },
});

const { actions: newsActions, reducer: newsReducer } = newsSlice;

export const {
  fetchNewsRequest,
  fetchNewsSuccess,
  fetchNewsFail,
} = newsActions;

export default newsReducer;
