import React from 'react';
import { t } from 'i18next';
import { Link } from 'react-router-dom';
import backofficeSvg from "../../assets/main/backoffice.svg";
const BackofficeLogo = () => {
    return (
        <Link to="/" className='flex items-center flex-col font-semibold hover:scale-[1.02] duration-200'>
            <img
                className="bg-cover w-20 lg:w-26 mx-auto"
                src={backofficeSvg} alt=""
            />
            <p className='text-lg lg:text-xl font-bold text-primaryColor'>{t("backoffice")}</p>
        </Link>
    );
};

export default BackofficeLogo;