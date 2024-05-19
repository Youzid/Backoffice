import React from 'react';
import { ReactComponent as XIcon } from '../../assets/X.svg';
interface Props {
    close:()=>void
}
const CloseButton = ({close}:Props) => {
    return (
        <XIcon onClick={close} className='w-6 h-6 top-3 end-3 absolute p-1 cursor-pointer duration-200 hover:bg-primaryRed hover:text-white text-primaryRed rounded-full'/>
    );
};

export default CloseButton;