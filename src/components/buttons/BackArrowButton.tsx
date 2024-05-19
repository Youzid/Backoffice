import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as  BackArrowIcon } from "../../assets/backArrow.svg";
import i18n from '../../utils/i18n';

interface Props {
    path:string,
    styles?:string
}
const BackArrowButton = ({path,styles}:Props) => {
    const isArabic = i18n.language === "ar";
    return (
        <Link to={path}><BackArrowIcon className={`absolute  duration-150 w-6 h-6 text-primaryBlack ${isArabic ? "rotate-180" :""}  ${styles ? styles : "-top-[68px] -start-3 "}`}/></Link>

    );
};

export default BackArrowButton;