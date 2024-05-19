

import CloseButton from '../buttons/CloseButton';
import { IClientsResponseBody } from '../../data/response/IClientsResponseBody';
import { t } from 'i18next';



interface ResourceModalProps {
    client: IClientsResponseBody;
    close: () => void;
}

const ClientViewModal = ({ client, close, }: ResourceModalProps) => {


    return (
        <>
            <div className={` fixed inset-0   z-[50] animate-slowfade  flex items-center justify-center  `} >
                <div className='relative   text-sm lg:text-lg shadow-xl bg-white rounded-lg   z-[1] flex flex-col  p-10 gap-10 justify-center'>
                    <CloseButton close={close} />
                        <h3 className="text-xl font-bold ">{t('client')}</h3>
                        <div className="border-b border-gray-300 pb-4 mb-4">
                            <div className={`flex items-center gap-x-4 mb-5 `}>
                                <span className={`font-bold  w-40 mr-2 whitespace-nowrap flex gap-1 `}>{t('fullName')} :</span>
                                <span className='whitespace-nowrap text-primaryGold font-semibold'>{client.firstName} {client.lastName}</span>
                            </div>
                            <div className={`flex items-center gap-x-4 mb-5 `}>
                                <span className={`font-bold  w-40 mr-2 whitespace-nowrap flex gap-1 `}>{t('email')} :</span>
                                <span className='whitespace-nowrap text-primaryGold font-semibold'>{client.email}</span>
                            </div>
                            <div className={`flex items-center gap-x-4 mb-5 `}>
                                <span className={`font-bold  w-40 mr-2 whitespace-nowrap flex gap-1 `}>{t('lastActive')} :</span>
                                <span className='whitespace-nowrap text-primaryGold font-semibold'>{client.lastActive.split("T")[1]}</span>
                            </div>
                        </div>
                    </div>
                <div onClick={close} className={` bg-black/20 fixed inset-0 duration-300`}></div>
            </div>
        </>
    );
};

export default ClientViewModal;
