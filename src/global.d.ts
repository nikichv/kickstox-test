export interface ApiNewsItem {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: {
    id: null | number;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
}
