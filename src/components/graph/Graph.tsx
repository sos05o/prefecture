import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React from 'react'
import { Population, Prefecture } from '@/src/types/type'

export interface GraphProps {
  data: {
    prefName: Prefecture['prefName']
    population: Population['data']
  }[]
}

const Graph = ({ data }: GraphProps) => {
  const series: Highcharts.SeriesOptionsType[] = data.map((pref) => {
    const ary = pref.population.filter((props) => props.label === '総人口' && props)[0]
    const param: Highcharts.SeriesOptionsType = {
      type: 'line',
      name: pref.prefName,
      data: ary.data.map((data) => data.value),
    }
    return param
  })

  const options: Highcharts.Options = {
    title: {
      text: '各都道府県の年代別人口構成',
    },
    series: series,
    plotOptions: {
      series: {
        pointInterval: 5,
        pointStart: 1980,
      },
    },
  }

  return (
    <div>
      <HighchartsReact
        // key={data.map(pref => pref.prefName).join(",")}
        highcharts={Highcharts}
        options={options}
      />
    </div>
  )
}

export default Graph
