export type ApiResponse<T> = {
  data: T | null;
  message: string;
  success: boolean;
};

export function emptyApiResponse<T>(message = "No data"): ApiResponse<T> {
  return {
    data: null,
    message,
    success: true,
  };
}
