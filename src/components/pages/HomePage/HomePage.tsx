import NewsTile from 'common/NewsTile';
import { useDispatch, useSelector } from 'react-redux';
import { NextPage } from 'next';
import React, { useCallback } from 'react';
import { fetchNewsRequest, NewsStoreState } from 'features/news/news.store';
import { RootState } from '../../../store';
import styles from './HomePage.module.css';

const HomePage: NextPage = () => {
  const dispatch = useDispatch();
  const news = useSelector<RootState, NewsStoreState>(state => state.news);

  const handleFetchButtonClick = useCallback(() => {
    dispatch(fetchNewsRequest());
  }, [dispatch]);

  return (
    <div className={styles.root}>
      {(news.isPending || news.isError) && <div className={styles.loader} />}
      {news.items.length !== 0 && (
        <main className={styles.rootGrid}>
          {news.items.map((n, i) => (
            <NewsTile key={`${i}_${n.url}`} article={n} />
          ))}
        </main>
      )}
      <button
        type='button'
        className={styles.button}
        onClick={handleFetchButtonClick}
      >
        Fetch news
      </button>
    </div>
  );
};

export default HomePage;
