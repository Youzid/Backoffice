// InputField.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import AddElementButton from '../buttons/AddElementButton';
import Spinner from './Spinner';

interface InputProps {
    label?:string
    formik?:any    // neccessary for formik only
    fieldName:string 
    fieldValue:string 
    optionValue?:string // required in nested data
    optionShow?:string // required in nested data
    labelStyles?:string
    borderStyle?:string
    selectTxt?:string
    handleSelectChange?:(e:any)=>void
    elementsList?:any[]
    addLink?:string 
    height?:string
}
const SelectField = ({addLink,selectTxt,fieldValue,optionValue,optionShow,height,elementsList,borderStyle,fieldName, label,labelStyles,handleSelectChange,formik }:InputProps) => {
  const {t} = useTranslation();
  return (
    <div className=" relative group">
      {label &&
        <label className={`text-primaryBlack font-bold pb-1 flex ${labelStyles ? labelStyles : "text-[12px] lg:text-sm"} `}>
          {t(label)}
        </label>
      }
      {elementsList ? 
        <div className='relative'>
          <select
            name={fieldName}
            value={fieldValue}
            onChange={formik ? formik.handleChange : (e) => handleSelectChange && handleSelectChange(e.target.value)}
            className={`  h-${height || "12"} rounded-lg outline-none text-[12px] cursor-pointer ${borderStyle} ${formik && formik.touched[fieldName] && formik.errors[fieldName] && 'border-primaryRed'} px-4  w-full`}
          >
            {selectTxt &&
              <option value="" className='text-sm' >{t(`${selectTxt}`)}</ option>
            }
            {elementsList?.map((element, i) => (
              <option key={i} value={optionValue ? element[optionValue] : element} className='text-sm cursor-pointer hover:bg-slate-300'>
                {optionShow ? t(element[optionShow]) : element}
              </option>
            ))}
          </select>
          {addLink && elementsList !== undefined && elementsList?.length < 1 &&
            <AddElementButton addLink={addLink} />
          }
        </div>
      :
      <Spinner/>
       }
       {formik && 
       formik.touched[fieldName] && formik.errors[fieldName] && (
          <p className="absolute text-primaryRed -bottom-4 left-0 text-[12px] lg:text-sm  flex">
            {formik.errors[fieldName]}
          </p>
        )
      }
    </div>
    
  );
};

export default SelectField;


