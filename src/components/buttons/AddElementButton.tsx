import React from 'react';
import { ReactComponent as AddIcon } from "../../assets/CRUD/plus.svg";
import { useNavigate } from 'react-router-dom';

interface Props {
    addLink:string;
}

const AddElementButton = ({addLink}:Props) => {
    const navigate = useNavigate();
    return (
        
        <AddIcon onClick={()=>navigate(addLink)} className='absolute w-5 h-5 top-4 end-6 p-[4px] text-white cursor-pointer hover:scale-110 duration-300 bg-primaryGold  rounded-full t'/>
        );
};

export default AddElementButton;