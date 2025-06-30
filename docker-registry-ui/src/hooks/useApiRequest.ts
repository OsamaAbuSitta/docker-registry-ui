import { useState, useCallback } from 'react';

interface ApiRequestState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

type ApiFunction<T, A extends any[]> = (...args: A) => Promise<T>;

export function useApiRequest<T, A extends any[]>(
  apiFunction: ApiFunction<T, A>,
  initialData: T | null = null
) {
  const [state, setState] = useState<ApiRequestState<T>>({
    data: initialData,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: A) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const result = await apiFunction(...args);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unexpected error occurred';
        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
        throw err;
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({
      data: initialData,
      loading: false,
      error: null,
    });
  }, [initialData]);

  return {
    ...state,
    execute,
    reset,
  };
}