import React from 'react';
import { ReactComponent as ArrowIcon } from '../../assets/next.svg';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { handleStepChange } from '../../store/features/BackOfficeSlice';

const PrevNextSilde = () => {
    const formStep = useAppSelector((state)=>state.backOffice.formStep);
    const dispatch = useAppDispatch();
    return (
        <div className=' flex justify-center  gap-4 text-white  w-full  py-4'>
                    <>
                        <button disabled={formStep <= 1} className={`flex items-center justify-center   duration-150   rotate-180 delay-300 ${formStep > 1 ? "opacity-100 ":"opacity-0 "}`} onClick={() => dispatch(handleStepChange(formStep - 1))}><ArrowIcon className=' w-9 h-9 p-[6px] bg-black/20  hover:bg-black/50 hover:translate-x-1 duration-150 rounded-full' /></button>
                        <button disabled={formStep >= 2} className={`flex items-center justify-center   duration-150              delay-300 ${formStep < 2 ? "opacity-100 ":"opacity-0 "}`} onClick={() => dispatch(handleStepChange(formStep + 1))}><ArrowIcon className=' w-9 h-9 p-[6px] bg-black/20  hover:bg-black/50 hover:translate-x-1 duration-150 rounded-full' /></button>
                    </>
                </div>
    );
};

export default PrevNextSilde;