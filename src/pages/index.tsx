import React, { useEffect, useState } from 'react'
import PrefectureCheckBoxes from '@/src/components/prefectureCheckBox/CheckBoxes'
import { GetPrefectureFunctions } from '@/src/functions/getDatas'
import { Prefecture } from '@/src/types/type'

export interface checkListProps extends Prefecture {
  checked: boolean
}

const Index = () => {
  const [checkList, setCheckList] = useState<checkListProps[]>([])

  const { prefecture, isLoading } = GetPrefectureFunctions()

  const toggleCheckFlgHandler = (prefCode: Prefecture['prefCode']) => {
    const fixList = checkList.map((pref) =>
      pref.prefCode === prefCode ? { ...pref, checked: !pref.checked } : pref,
    )
    setCheckList(fixList)
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

  return (
    <>
      <PrefectureCheckBoxes prefecture={checkList} handler={toggleCheckFlgHandler} />
    </>
  )
}

export default Index
