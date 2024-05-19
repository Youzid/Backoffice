import React from 'react';

interface IformSliderProps {
    Child: React.ComponentType;
    formStep: number;
    targetStep: number;
}
const FormSlider = ({ Child, formStep, targetStep,  }: IformSliderProps) => {

    return (
        <div className={` absolute top-28 w-full    duration-700 ${formStep === targetStep ? " opacity-100 translate-x-0 delay-500" : " opacity-0 pointer-events-none translate-x-40 "}`}>
            <Child />
        </div>
    );
};

export default FormSlider;