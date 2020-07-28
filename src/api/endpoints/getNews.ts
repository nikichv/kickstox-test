import httpClient from 'api/httpClient';
import { AxiosResponse } from 'axios';
import { ApiNewsItem } from '../../global';

export interface GetNewsParams {
  q: string;
  from: string;
  sortBy: string;
}

export interface GetNewsResponse {
  status: string | 'ok';
  totalResults: number;
  articles: ApiNewsItem[];
}

const getNews = async (
  params: GetNewsParams
): Promise<AxiosResponse<GetNewsResponse>> => {
  return httpClient
    .get<GetNewsResponse>('/everything', {
      params: {
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
        ...params,
      } as GetNewsParams,
    })
    .catch(e => e.response);
};

export default getNews;
