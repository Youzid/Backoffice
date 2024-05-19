import React, { useEffect, useState } from 'react';
import { t } from 'i18next';

interface MoneyFormatterInputProps{

  // if using formik make sure the input isTouched before sending "inputError" dependency
  
fieldName:any //core dependency
setFormDataValue:(value:any)=>void //core dependency
setInputError?:()=>void //core but not needed with formik
inputError?:string  //core but not needed with formik
fielValue:number  //core dependency
maxAmount?:number // optional
label?:string // optional
style?:string // optional
}

const MoneyFormatterInput = ({fieldName,setFormDataValue,label,style,inputError,fielValue,maxAmount,setInputError}:MoneyFormatterInputProps) => {
  const [value, setValue] = useState( fielValue);

  const handleInputChange = (event:any) => {
    const inputValue = event.target.value;

    // Remove non-numeric characters from the input
    const numericValue = inputValue.replace(/[^0-9.]/g, '');
    setInputError && setInputError();
    setValue(numericValue);
    setFormDataValue(numericValue === '' ? '0' : maxAmount && numericValue > maxAmount ? maxAmount : numericValue);
};
  const formatValue = (value:number) => {
    const formatter = new Intl.NumberFormat('en-US');

    return formatter.format(value);
  };
  // added to ensure state update when  fieldValue is fetched
  useEffect(() => {
    setValue(fielValue || 0);
  }, [fielValue]);
  
  
  const formattedValue = formatValue(maxAmount ?(value > maxAmount ? maxAmount : value) : value);
  return (
    <div className='relative'>
        <label className="text-primaryBlack font-bold" htmlFor="username">
                            {t(`${label !== undefined ? label : fieldName}`)}
                        </label>
          <span className={`${(inputError )? "border-primaryRed duration-200":""}bg-white   mt-1 px-4 flex gap-x-2 items-center justify-between rounded-xl duration-200 shadow-primaryGray placeholder-[#7C859A]  ${!style && " border-2 "}   `}>
              <input
                  type="text"
                  className={`font-normal  py-2 bg-transparent    outline-none disabled:bg-transparent resize-none  ${style}`}
                  value={formattedValue}
                  onChange={handleInputChange}
                  name={fieldName}
              />
              <span className={`absolute end-5 font-normal`}>{t("DZD")}</span>
          </span>
          {
                           inputError && (
                                <span className={`text-xs text-primaryRed font-bold self absolute start-0`}> {inputError}</span>
                            )
                        }
    </div>
  );
};

export default MoneyFormatterInput;