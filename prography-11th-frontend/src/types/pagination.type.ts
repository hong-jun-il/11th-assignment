export type PaginationType<T = any> = {
  content: T;
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};
