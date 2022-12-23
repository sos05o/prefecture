import React from 'react'
import { checkListProps } from '@/src/pages'
import style from '@/src/styles/checkboxes.module.scss'

interface Props {
  prefecture: checkListProps[]
  handler: (prefCode: checkListProps['prefCode']) => void
}

const PrefectureCheckBoxes = ({ prefecture, handler }: Props) => {
  return (
    <div className={style.wrapper}>
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
    <label className={`${style.checkbox} ${checked && style.checked}`}>
      <div className={style.icon_area}>
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d={
              checked
                ? 'M9.92006 17.6479C5.7923 17.6479 2.43206 14.2877 2.43206 10.1599C2.43206 6.03217 5.7923 2.67193 9.92006 2.67193C14.0478 2.67193 17.4081 6.03217 17.4081 10.1599C17.4081 14.2877 14.0478 17.6479 9.92006 17.6479ZM9.92006 0.799927C8.69089 0.799927 7.47375 1.04203 6.33814 1.51241C5.20253 1.9828 4.1707 2.67225 3.30154 3.54141C1.5462 5.29675 0.560059 7.6775 0.560059 10.1599C0.560059 12.6423 1.5462 15.0231 3.30154 16.7784C4.1707 17.6476 5.20253 18.3371 6.33814 18.8074C7.47375 19.2778 8.69089 19.5199 9.92006 19.5199C12.4025 19.5199 14.7832 18.5338 16.5386 16.7784C18.2939 15.0231 19.2801 12.6423 19.2801 10.1599C19.2801 8.93075 19.038 7.71362 18.5676 6.57801C18.0972 5.4424 17.4077 4.41056 16.5386 3.54141C15.6694 2.67225 14.6376 1.9828 13.502 1.51241C12.3664 1.04203 11.1492 0.799927 9.92006 0.799927M5.24006 11.0959H14.6001V9.22392H5.24006'
                : 'M9.92006 17.6479C5.7923 17.6479 2.43206 14.2877 2.43206 10.1599C2.43206 6.03217 5.7923 2.67193 9.92006 2.67193C14.0478 2.67193 17.4081 6.03217 17.4081 10.1599C17.4081 14.2877 14.0478 17.6479 9.92006 17.6479ZM9.92006 0.799927C8.69088 0.799927 7.47375 1.04203 6.33814 1.51241C5.20253 1.9828 4.1707 2.67225 3.30154 3.54141C1.5462 5.29675 0.560059 7.6775 0.560059 10.1599C0.560059 12.6423 1.5462 15.0231 3.30154 16.7784C4.1707 17.6476 5.20253 18.337 6.33814 18.8074C7.47375 19.2778 8.69088 19.5199 9.92006 19.5199C12.4025 19.5199 14.7832 18.5338 16.5386 16.7784C18.2939 15.0231 19.2801 12.6423 19.2801 10.1599C19.2801 8.93075 19.038 7.71361 18.5676 6.57801C18.0972 5.4424 17.4077 4.41056 16.5386 3.54141C15.6694 2.67225 14.6376 1.9828 13.502 1.51241C12.3664 1.04203 11.1492 0.799927 9.92006 0.799927ZM10.8561 5.47993H8.98406V9.22392H5.24006V11.0959H8.98406V14.8399H10.8561V11.0959H14.6001V9.22392H10.8561V5.47993Z'
            }
            fill='#F8F8F8'
          />
        </svg>
      </div>
      <input
        type={'checkbox'}
        className={style.input}
        name={'prefCheckBox'}
        checked={checked}
        value={value}
        onChange={onChange}
        hidden={true}
      />
      {value}
    </label>
  )
}

export default PrefectureCheckBoxes
