

import { t } from 'i18next';
import CloseButton from '../buttons/CloseButton';
import PrimaryButton from '../buttons/PrimaryButton';
interface IProps {
    close:()=>void
    backToLogin:()=>void
}
const ValidateEmailModal = ({close,backToLogin}:IProps) => {

    return (
        <>
            <div className={` fixed inset-0   z-[50] animate-slowfade  flex items-center justify-center  `}>
                <div className='relative   text-sm lg:text-lg shadow-xl bg-white rounded-lg   z-[1] flex flex-col  p-10 gap-10 justify-center'>
                    <CloseButton close={close} />
                    <div className='flex flex-col items-center justify-center gap-10 max-w-[600px] text-center'>
                    <h1 className='font-semibold text-xl'>{t('confirmEmail')}</h1>
                    <p>{t('emailValidateMessage')}</p>
                    <PrimaryButton text="backToLogin"  onClick={backToLogin}/>
                    </div>
                    </div>
                <div onClick={close} className={` bg-black/20 fixed inset-0 duration-300`}></div>
            </div>
        </>
    );
};

export default ValidateEmailModal;
