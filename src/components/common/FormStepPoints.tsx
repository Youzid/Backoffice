import React from 'react';
import { useAppDispatch } from '../../store/store';
import { t } from 'i18next';
import { ReactComponent as DoneIcon } from '../../assets/formstepper/done.svg';
import { ReactComponent as CurrentIcon } from '../../assets/formstepper/current.svg';
import { handleStepChange } from '../../store/features/BackOfficeSlice';
interface IFormStepPoints {
    disable: boolean
    formStep: number
}
interface IIconProps {
    step: number;
    isLast?: boolean;
    disable: boolean;
    formStep: number;
    title: string
}
const FormStepPoints = ({ disable, formStep }: IFormStepPoints) => {

    const StepPoint = ({ step, isLast, disable, formStep, title }: IIconProps) => {
        const dispatch = useAppDispatch();
        switch (true) {
            case formStep > step:
                return (
                    <div className='flex flex-col items-start relative '>
                        <div className='relative flex items-center'>
                            <div className={`w-9 h-9 bg-transparent 0  border-primaryColor rounded-full duration-300 ${!disable && "cursor-pointer hover:scale-105"}`} onClick={() => !disable && dispatch(handleStepChange(step))}>
                                <DoneIcon className='w-full h-full animate-slowfade' />
                            </div>
                            {!isLast &&
                                <div className='w-40 h-[2px] bg-primaryColor rounded-full  duration-1000'></div>
                            }
                        <h1 className='-start-2 -bottom-8 absolute font-semibold '>{t(title)}</h1>
                        </div>
                    </div>
                );
            case formStep === step:
                return (
                    <div className='flex flex-col items-start relative '>
                        <div className='relative flex items-center'>
                            <div className={`w-9 h-9 bg-transparent 0 border-2 border-slate-400 rounded-full duration-300 ${!disable && "cursor-pointer hover:scale-105"}`} onClick={() => !disable && dispatch(handleStepChange(step))}>
                                <CurrentIcon className='w-full h-full rounded-full animate-slowfade' />
                            </div>
                            {!isLast &&
                                <div className='w-40 h-[2px] bg-slate-400 rounded-full duration-1000'></div>
                            }
                        </div>
                        <h1 className='-start-2 -bottom-8 absolute font-semibold'>{t(title)}</h1>
                    </div>
                );
            case formStep < step:
                return (
                    <div className='flex flex-col items-start relative '>

                        <div className='relative flex items-center'>
                            <div className={`w-9 h-9 bg-transparent 0 border-2 border-slate-400 rounded-full duration-300 ${!disable && "cursor-pointer hover:scale-105"}`} onClick={() => !disable && dispatch(handleStepChange(step))}>
                            </div>
                            {!isLast &&
                                <div className='w-40 h-[2px] bg-slate-400 rounded-full duration-1000'></div>
                            }
                        </div>
                        <h1 className='-start-2 -bottom-8 absolute font-semibold'>{t(title)}</h1>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className='flex'>
            <StepPoint step={1} disable={disable} formStep={formStep} title='general' />
            <StepPoint step={2} isLast disable={disable} formStep={formStep} title='photos' />
        </div>
    );
};

export default FormStepPoints;