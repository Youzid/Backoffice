
import { t } from 'i18next';
import { ReactComponent as AlertIcon } from '../../assets/deleteAlert.svg';

interface FullPermissionsProps {
    user: string;
    onClose: () => void;
    action: string
    handlePermissionAutoSelect: (action:string,checked:boolean) => void
    checked: boolean
}

const FullPermissionsAlertModal = ({ user, action,handlePermissionAutoSelect,checked, onClose }: FullPermissionsProps) => {
    const actionText = checked ? t("add") : t("remove");
    return (
        <div className="fixed inset-0 z-50 backdrop-blur-sm flex justify-center items-center">
            <div className="absolute inset-0 bg-lightGray opacity-30"></div>
            <div className="flex flex-col gap-y-6 items-center bg-white rounded-lg p-8 z-10 w-fit shadow-primaryBlack/30 shadow-lg">
                <div className="flex flex-col items-center gap-y-3">
                    <AlertIcon />
                    <h2 className='text-center text-lg text-primaryBlack'>
                        {t('permissions-confirmation')}{' '}
                        <p className='font-bold inline-flex'>{actionText}</p>
                        <div className='flex gap-2 items-center justify-center'>
                            {t(`all-${action}-permissions`)} {t("to")}{' '}
                            <p className='capitalize font-extrabold'>{user}</p>
                        </div>
                    </h2>
                </div>
                <div className='flex gap-8'>
                    <button
                        onClick={() => handlePermissionAutoSelect(action, checked)}
                        className={`w-[150px] border-2 flex flex-col items-center justify-center  ${checked ?"bg-primaryColor border-primaryColor" : "bg-primaryRed border-primaryRed"}  duration-200 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline`}
                        type="submit"
                    >
                        {
                            checked ?(`${t('add')}`) : (`${t('remove')}`)
                            
                        }
                    </button>
                    <button
                        className="w-[100px] border-2 border-primaryGray duration-200 text-primaryBlack hover:bg-slate-200 font-bold py-2 px-4 rounded-md "
                        onClick={onClose}
                    >
                        {t('cancel')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FullPermissionsAlertModal;
