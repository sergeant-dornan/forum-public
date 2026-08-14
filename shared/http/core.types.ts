export type ResponseBodyBase<T extends unknown> = T;

export interface ErrorResponseBody {
  message: string;
}