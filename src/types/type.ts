export interface Prefecture {
  prefCode: number
  prefName: string
}

export interface Population {
  boundaryYear: number
  data: {
    label: '総人口' | '年少人口' | '生産年齢人口' | '老年人口'
    data: PopulationValue[]
  }[]
}

interface PopulationValue {
  year: number
  value: number
  rate?: number
}
