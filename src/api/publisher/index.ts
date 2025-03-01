import { TResponsePaginate } from '@/common/types/response';
import { axios } from '@/utils/fetcher';
import { TPublisher } from './type';

export type TGetpublishersParams = {
  page?: number;
  sort_by?: string;
  order?: string;
  search?: string;
};

export type TGetPublisherResponse = TPublisher;

export const getPublishers = async (
  params: TGetpublishersParams
): Promise<TResponsePaginate<TGetPublisherResponse>> => {
  const { data } = await axios.get<TResponsePaginate<TGetPublisherResponse>>(
    '/api/publishers',
    { params }
  );
  return data;
};
