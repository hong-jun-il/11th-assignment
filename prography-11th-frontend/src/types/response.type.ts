type ErrorType = {
  code: string;
  message: string;
};

export type ResponseType<T = any> = {
  success: boolean;
  data: null | T;
  error: null | ErrorType;
};
