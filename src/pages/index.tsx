import React, { useEffect, useState } from 'react'
import Graph, { GraphProps } from '@/src/components/graph/Graph'
import PrefectureCheckBoxes from '@/src/components/prefectureCheckBox/CheckBoxes'
import { GetPopulationFunction, GetPrefectureFunctions } from '@/src/functions/getDatas'
import style from '@/src/styles/index.module.scss'
import { Prefecture } from '@/src/types/type'

export interface checkListProps extends Prefecture {
  checked: boolean
}

const Index = () => {
  const [checkList, setCheckList] = useState<checkListProps[]>([])
  const [dataList, setDataList] = useState<GraphProps['data']>([])

  const { prefecture, isLoading } = GetPrefectureFunctions()

  const toggleCheckFlgHandler = (prefCode: Prefecture['prefCode']) => {
    const fixList = checkList.map((pref) =>
      pref.prefCode === prefCode ? { ...pref, checked: !pref.checked } : pref,
    )
    setCheckList(fixList)
  }

  const getPopulationHandler = (prefCode: number) => {
    const { population } = GetPopulationFunction(prefCode)
    return population
  }

  useEffect(() => {
    if (!isLoading && prefecture !== undefined) {
      const checkList = prefecture.result.map((pref) => {
        return {
          prefCode: pref.prefCode,
          prefName: pref.prefName,
          checked: false,
        }
      })
      setCheckList(checkList)
    }
  }, [isLoading, prefecture])

  useEffect(() => {
    const ary = checkList
      .filter((props) => props.checked)
      .map((props) => {
        return {
          prefName: props.prefName,
          prefCode: props.prefCode,
        }
      })
    const dataPrefNameList = dataList.map((props) => props.prefName)

    const getPrefCode = ary.filter((props) => dataPrefNameList.indexOf(props.prefName) === -1)[0]

    if (getPrefCode !== undefined) {
      getPopulationHandler(getPrefCode.prefCode).then((res) => {
        if (res !== undefined) {
          setDataList([
            ...dataList,
            { prefName: getPrefCode.prefName, population: res.result.data },
          ])
        }
      })
    } else {
      const aryPrefNameList = ary.map((props) => props.prefName)
      const remainAry = dataList.filter((props) => aryPrefNameList.indexOf(props.prefName) !== -1)
      setDataList([...remainAry])
    }
  }, [checkList])

  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        <h1>Graph</h1>
      </div>
      <div className={style.graph}>
        <Graph data={dataList} />
        {/*サンプル1*/}
      </div>
      <div className={style.checkboxes}>
        <PrefectureCheckBoxes prefecture={checkList} handler={toggleCheckFlgHandler} />
        {/*サンプル2*/}
      </div>
    </div>
  )
}

export default Index
