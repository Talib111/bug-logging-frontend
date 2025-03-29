import {
  useQuery,
  UseQueryResult,
  UndefinedInitialDataOptions,
  QueryKey,
  UseMutationOptions,
  useMutation,
} from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { authApi, grievanceAPI, axios, axiosInstanceForJuidco } from '@/lib'

const APITYPE = {
  ...authApi,
  ...grievanceAPI,
}

type API = (typeof APITYPE)[keyof typeof APITYPE]

// useGet api

export const apiFetcher = async (
  url: string,
  pageParam?: number,
  config?: any
) => {
  const res = await axios.get(url, {
    params: {
      offset: pageParam,
      ...config,
    },
  })
  return res.data
}

// ===================================================useQuery start=================================================================
type USE_QUERY_TYPE = {
  api: any
  options: Partial<
    UndefinedInitialDataOptions<unknown, Error, unknown, QueryKey>
  >
  key?: string
  value?: any[]
  config?: {
    [key: string]: any
  }
}

export type QUERY_RESULT<T> = UseQueryResult<T, Error>
// ==================== fetch data via get method ====================

export const apiFetcherGet = async (url: string, config?: any) => {
  const res = await axios.get(url, {
    ...config,
  })
  return res.data
}

export function useApi<T>({
  key,
  api,
  options,
  value,
  config,
}: USE_QUERY_TYPE) {
  const result = useQuery({
    queryKey: [key ?? api, ...(value ?? [])],
    queryFn: async () => apiFetcherGet(api, config),
    refetchOnReconnect: 'always',
    refetchOnWindowFocus: false,
    ...options,
  })
  return result as UseQueryResult<T, Error>
}

// ==================== fetch data via post method ====================
export function useApiPost<T>({
  key,
  api,
  options,
  value,
  config,
}: USE_QUERY_TYPE) {
  const result: UseQueryResult<any, Error> = useQuery<any, Error>({
    queryKey: [key ?? api, ...(value ?? [])],
    queryFn: async () => {
      const res = await axios.post(api, {
        ...config,
      })
      return res.data
    },
    refetchOnReconnect: 'always',
    refetchOnWindowFocus: false,
    ...options,
  })
  return result as UseQueryResult<T, Error>
}
// ===================================================useQuery end=================================================================

// ==================== useMutation method start ====================
const postApi = (api: API, data: {}) => {
  return axios.post(api, data)
}

export type USE_MUTATION_TYPE = {
  options?: UseMutationOptions<AxiosResponse<any, any>, Error, void, unknown>
}

export const usePostMutation = ({ options }: USE_MUTATION_TYPE) => {
  return useMutation<AxiosResponse<any, any>, Error, any, unknown>({
    mutationFn: ({ api, data }: { api: API; data: {} }) => postApi(api, data),
    ...options,
  })
}
// ==================== useMutation method end ====================

export const usePostMutationWitFormData = ({ options }: USE_MUTATION_TYPE) => {
  return useMutation<AxiosResponse<any, any>, Error, any, unknown>({
    mutationFn: ({ api, data }: { api: API; data: FormData }) =>
      axios.post(api, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    ...options,
  })
}

// ==================== useMutation put method start ====================
const putApi = (api: API, data: {}) => {
  return axios.put(api, data)
}

export const usePutMutation = ({ options }: USE_MUTATION_TYPE) => {
  return useMutation<AxiosResponse<any, any>, Error, any, unknown>({
    mutationFn: ({ api, data }: { api: API; data: {} }) => putApi(api, data),
    ...options,
  })
}

// ==================== useMutation patch method end ====================
const patchApi = (api: API, data: {}) => {
  return axios.patch(api, data)
}

export const usePatchMutation = ({ options }: USE_MUTATION_TYPE) => {
  return useMutation({
    mutationFn: ({ api, data }: any) => patchApi(api, data),
    ...options,
  })
}

// ==================== useMutation patch method end ====================


export const useGetMutation = () => {
  return useMutation({
    mutationFn: ({ api }: any) => axios.get(api),
  })
}


// ==============================================================================API FOR JUIDCO================================================================

export function useApiPostJuidco<T>({
  key,
  api,
  options,
  value,
  config,
}: USE_QUERY_TYPE) {
  const result: UseQueryResult<any, Error> = useQuery<any, Error>({
    queryKey: [key ?? api, ...(value ?? [])],
    queryFn: async () => {
      const res = await axiosInstanceForJuidco.post(api, {
        ...config,
      })
      return res.data
    },
    refetchOnReconnect: 'always',
    refetchOnWindowFocus: false,
    ...options,
  })
  return result as UseQueryResult<T, Error>
}
// ===================================================useQuery end=================================================================

// ==================== useMutation method start  for post data in payload for search data====================
const postApiJuidco = (api: API, data: {}) => {
  return axiosInstanceForJuidco.post(api, data)
}

export const usePostMutationJuidco = ({ options }: USE_MUTATION_TYPE) => {
  return useMutation<AxiosResponse<any, any>, Error, any, unknown>({
    mutationFn: ({ api, data }: { api: API; data: {} }) => postApiJuidco(api, data),
    ...options,
  })
}