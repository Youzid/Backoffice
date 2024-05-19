import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PrimaryButton from '../../../../components/buttons/PrimaryButton';
import Reviews from '../../../../components/common/Reviews';

const ReviewsSettings = () => {
    const {t}= useTranslation();
    const [listType, setListType] = useState<string>("mostRecent");

    return (
        <div className='px-40 space-y-8  py-10 w-full relative'>
            <div className='flex gap-6 justify-center'>
                    <PrimaryButton text={t("mostRecent")} txtStyle={listType !== "mostRecent" && "text-black" || ""} bgColor={listType !== "mostRecent" && "white" || ""} onClick={()=> setListType("mostRecent")}/>
                    <PrimaryButton text={t("favorableReviews")}  txtStyle={listType !== "favorable" && "text-black" || ""} bgColor={listType !== "favorable" && "white" || ""} onClick={()=> setListType("favorable")}/>
                    <PrimaryButton text={t("unfavorableReviews")}  txtStyle={listType !== "unFavorable" && "text-black" || ""} bgColor={listType !== "unFavorable" && "white" || ""} onClick={()=> setListType("unFavorable")}/>
            </div>
            <Reviews ListType={listType} isLocationImage/>
        </div>
    );
};

export default ReviewsSettings;
