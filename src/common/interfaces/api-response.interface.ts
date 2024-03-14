export interface ApiResponseInterface<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, any>;
}
