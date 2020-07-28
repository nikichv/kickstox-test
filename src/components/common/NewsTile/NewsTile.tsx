import React, { useMemo } from 'react';
import { ApiNewsItem } from '../../../global';
import styles from './NewsTile.module.css';

interface NewsTileProps {
  article: ApiNewsItem;
}

const NewsTile: React.FC<NewsTileProps> = props => {
  const { article } = props;
  const { author, publishedAt, description, title, url, urlToImage } = article;

  const formattedDate = useMemo(() => {
    const d = new Date(publishedAt);
    return d.toLocaleDateString();
  }, [publishedAt]);

  return (
    <a
      className={styles.articleLink}
      href={url}
      target='_blank'
      rel='noreferrer noopener'
    >
      <article className={styles.articleRoot}>
        <div className={styles.imageWrap}>
          {urlToImage ? (
            <>
              <img src={urlToImage} className={styles.image} />
              <div
                className={styles.imageBlur}
                style={{
                  backgroundImage: `url('${urlToImage}')`,
                }}
              />
            </>
          ) : (
            <div className={styles.imagePlaceholder}>No image provided.</div>
          )}
        </div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <span className={styles.publishedAt}>{formattedDate}</span>
        <span className={styles.author}>{author}</span>
      </article>
    </a>
  );
};

export default NewsTile;
