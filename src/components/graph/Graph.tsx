import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsExporting from 'highcharts/modules/exporting'
import React from 'react'
import style from '@/src/styles/graph.module.scss'
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
    chart: {
      backgroundColor: undefined,
    },
    lang: {
      // thousandsSep: ',',
      numericSymbols: ['千', '百万', '十億', '兆', '千兆', '百京'],
    },
  }

  if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
  }

  return (
    <div className={style.wrapper}>
      <div className={style.sub_wrapper}>
        <HighchartsReact
          // key={data.map(pref => pref.prefName).join(",")}
          highcharts={Highcharts}
          options={options}
          reflow={true}
          containerProps={{ style: { width: '100%', height: '100%' } }}
        />
      </div>
    </div>
  )
}

export default Graph
