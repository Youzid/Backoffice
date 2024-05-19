
import { useTranslation } from 'react-i18next';

import CloseButton from '../buttons/CloseButton';
import { IUsersResponseBody } from '../../data/response/IUsersResponseBody';



interface ResourceModalProps {
    user: IUsersResponseBody;
    close: () => void;
}

const UserDetailsModal = ({ user, close, }: ResourceModalProps) => {

    const { t } = useTranslation();


    return (
        <>
            <div className={` fixed inset-0   z-[50] animate-slowfade  flex items-center justify-center  `}>
                <div className='relative   text-sm lg:text-lg shadow-xl bg-gray-100   z-[1] flex flex-col  p-10 gap-10 justify-center'>
                    <CloseButton close={close} />
                        <div className="border-b border-gray-300 pb-4 mb-4">
                            <div className="flex items-center gap-x-4 mb-2">
                                <span className="font-bold w-[220px] mr-2 whitespace-nowrap">{t('fullName')}</span>
                                <span className='whitespace-nowrap'>{user.firstName} {user.lastName}</span>
                            </div>
                            <div className="flex items-center gap-x-4 mb-2">
                                <span className="font-bold w-[220px] mr-2 whitespace-nowrap">{t('username')}</span>
                                <span className='whitespace-nowrap'>{user.username}</span>
                            </div>
                            <div className="flex items-center gap-x-4 mb-2">
                                <span className="font-bold w-[220px] mr-2 whitespace-nowrap">{t('email')}</span>
                                <span className='whitespace-nowrap'>{user.email}</span>
                            </div>
                            <div className="flex items-center gap-x-4 mb-2">
                                <span className="font-bold w-[220px] mr-2 whitespace-nowrap">{t("lastActive")}</span>
                                <span className='whitespace-nowrap'>{user.lastActive?.split("T")[0]}</span>
                            </div>
                            <div className="flex items-center gap-x-4 mb-2">
                                <span className="font-bold w-[220px] mr-2 whitespace-nowrap">{t("isActivated")}?</span>
                                <span className={`whitespace-nowrap ${user.isActivated ? "text-green-400" : "text-primaryRed"}`}>{user.isActivated ? t('active') : t('blocked')}</span>
                            </div>
                        </div>
                    </div>
                <div onClick={close} className={` bg-black/20 fixed inset-0 duration-300`}></div>
            </div>
        </>
    );
};

export default UserDetailsModal;
