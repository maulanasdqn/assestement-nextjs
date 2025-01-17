export type TResponsePaginate<T> = {
  data: T[];
  meta: {
    total_page: number;
    total: number;
    page: number;
    per_page: number;
  };
  status_code: number;
  version: string;
};

export type TResponseData<T> = {
  data: T;
  status_code: number;
  version: string;
};

export type TResponseError = {
  status: number;
  message: string;
  errors?: {
    path: string[];
    message: string;
  }[];
};
