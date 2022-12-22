import React from 'react'
import { checkListProps } from '@/src/pages'

interface Props {
  prefecture: checkListProps[]
  handler: (prefCode: checkListProps['prefCode']) => void
}

const PrefectureCheckBoxes = ({ prefecture, handler }: Props) => {
  return (
    <div className={'check_boxes'}>
      {prefecture.map((pref) => (
        <CheckBox
          key={pref.prefName}
          value={pref.prefName}
          checked={pref.checked}
          onChange={() => handler(pref.prefCode)}
        />
      ))}
    </div>
  )
}

interface CheckBoxProps {
  value: string
  checked: boolean
  onChange: () => void
}

const CheckBox = ({ value, checked, onChange }: CheckBoxProps) => {
  return (
    <>
      <label>
        <input
          type={'checkbox'}
          name={'prefCheckBox'}
          checked={checked}
          value={value}
          onChange={onChange}
        />
        {value}
      </label>
    </>
  )
}

export default PrefectureCheckBoxes
