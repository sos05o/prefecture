import axios, { AxiosRequestConfig } from 'axios'
import useSWR, { SWRConfiguration } from 'swr'
import { Population, Prefecture } from '@/src/types/type'

const defaultGetConfig: AxiosRequestConfig = {
  method: 'GET',
  baseURL: process.env.NEXT_PUBLIC_ENDPOINT,
  url: '',
  responseType: 'json',
  responseEncoding: 'UTF-8',
  headers: {
    'X-API-KEY': process.env.NEXT_PUBLIC_RESAS_API_KEY,
  },
  params: {},
}

const CustomSWRConfig: SWRConfiguration = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnMount: false,
  revalidateOnReconnect: false,
  shouldRetryOnError: false,
  focusThrottleInterval: 3600,
}

type GetPrefectureResponse = {
  message: null
  result: Prefecture[]
}

type GetPopulationResponse = {
  message: null
  result: Population
}
/**
 * RESAS APIから、都道府県の一覧データを取得する関数
 * */
export const GetPrefectureFunctions = () => {
  const config = {
    ...defaultGetConfig,
    url: 'api/v1/prefectures',
  }
  const { data, isLoading } = useSWR(
    'api/v1/prefecture',
    () =>
      axios<GetPrefectureResponse>(config).then((res) => {
        if (res.status === 200) return res.data
      }),
    CustomSWRConfig,
  )
  return {
    prefecture: data,
    isLoading,
  }
}

/**
 * RESAS APIから、特定の都道府県の人口構成を取得する関数
 * */
export const GetPopulationFunction = (prefCode: number) => {
  const config = {
    ...defaultGetConfig,
    url: 'api/v1/population/composition/perYear',
    params: {
      prefCode: prefCode,
      cityCode: '-',
    },
  }
  const { data, isLoading } = useSWR<GetPopulationResponse | undefined>(
    ['api/v1/population/composition/perYear', prefCode],
    () =>
      axios<GetPopulationResponse>(config).then((res) => {
        if (res.status === 200) return res.data
      }),
    CustomSWRConfig,
  )
  return {
    population: data,
    isLoading,
  }
}
