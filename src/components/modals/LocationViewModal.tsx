

import { ILocationResponseBody } from '../../data/response/ILocationResponseBody';
import getTranslatedValue from '../../utils/getTranslatedValue';
import CloseButton from '../buttons/CloseButton';
import { t } from 'i18next';



interface ResourceModalProps {
    location: ILocationResponseBody;
    close: () => void;
}

const LocationViewModal = ({ location, close, }: ResourceModalProps) => {


    return (
        <>
            <div className={` fixed inset-0   z-[50] animate-slowfade  flex items-center justify-center  `} >
                <div className='relative   text-sm lg:text-lg shadow-xl bg-white rounded-lg   z-[1] flex flex-col  p-10 gap-10 justify-center'>
                    <CloseButton close={close} />
                        <h3 className="text-xl font-bold ">{t('location')}</h3>
                        <div className="border-b border-gray-300 pb-4 mb-4  w-[600px]">
                            <div className={`flex items-center gap-x-4 mb-5 `}>
                                <span className={`font-bold  w-40 mr-2 whitespace-nowrap flex gap-1 `}>{t('name')} :</span>
                                <span className='whitespace-nowrap text-primaryGold font-semibold'>{getTranslatedValue(location.nameAr,location.nameFr,location.nameEn)}</span>
                            </div>
                            <div className={`flex items-center gap-x-4 mb-5 `}>
                                <span className={`font-bold  w-40 mr-2 whitespace-nowrap flex gap-1 `}>{t('category')} :</span>
                                <span className='whitespace-nowrap text-primaryGold font-semibold'>{t(location.categoryName)}</span>
                            </div>
                            <div className={`flex items-center gap-x-4 mb-5 `}>
                                <span className={`font-bold  w-40 mr-2 whitespace-nowrap flex gap-1 `}>{t('address')} :</span>
                                <span className='whitespace-nowrap text-primaryGold font-semibold'>{getTranslatedValue(location.addressAr,location.address,location.address)}</span>
                            </div>
                            <div className={`flex items-center gap-x-4 mb-5 `}>
                                <span className={`font-bold  w-40 mr-2 whitespace-nowrap flex gap-1 `}>{t('rating')} :</span>
                                <span className='whitespace-nowrap text-primaryGold font-semibold'>{location.rating || "-"}</span>
                            </div>
                            <div className={`flex items-center gap-x-4 mb-5`}>
                                <span className={`font-bold  w-40 mr-2 whitespace-nowrap flex gap-1 `}>{t('description')} :</span>
                                <span className='text-sm max-w-fit text-primaryGold font-semibold'>{getTranslatedValue(location.descriptionAr,location.descriptionFr,location.descriptionEn)}</span>
                            </div>
                        </div>
                    </div>
                <div onClick={close} className={` bg-black/20 fixed inset-0 duration-300`}></div>
            </div>
        </>
    );
};

export default LocationViewModal;
