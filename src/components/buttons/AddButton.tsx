import React from 'react';
import { ReactComponent as AddIcon } from '../../assets/add.svg';
interface Props {
    onClick:()=>void
}
const AddButton = ({onClick}:Props) => {
    return (
        <AddIcon onClick={onClick} className='w-7 h-7 p-1  shadow-xl top-2 -end-10 hover:scale-110 absolute cursor-pointer duration-200 bg-primaryGold text-white text-primaryGbg-primaryGold rounded-full'/>
    );
};

export default AddButton;