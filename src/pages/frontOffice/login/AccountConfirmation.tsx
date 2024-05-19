import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as ConfirmationIcon } from '../../../assets/checked.svg';
import { ReactComponent as FailedIcon } from '../../../assets/X.svg';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import Spinner from '../../../components/common/Spinner';
import { useEffect, useState } from 'react';
import axios from 'axios';
import endpoints from '../../../api/endpoints';
import { toast } from 'react-hot-toast';
import SubmitResponseHandler from '../../../components/common/SubmitResponseHandler';
import LanguagesBox from '../../../components/common/LanguagesBox';
import { t } from 'i18next';
import BackofficeLogo from '../../../components/common/BackofficeLogo';

const AccountConfirmation = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);
        axios
            .patch(endpoints.AUTH_ACCOUNT_CONFIRMATION + token)

            .catch((err) => {
                setIsError(true);
                toast.error(<SubmitResponseHandler message={err.response?.data?.message} errorCodeStr={err?.response?.data?.errorCodeStr} />);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [token]);
    const Success = () => {
        return (
            <div className=' p-10 text-center space-y-4'>

                <div className={`flex gap-2 items-center lg:text-xl font-semibold justify-center text-sm `}>
                    <ConfirmationIcon className='text-green-600 w-6 h-6' />
                    <h1>{t("accountConfirmationSucceded")}</h1>
                </div>
                <p>{t("accountConfirmationMessage")}</p>
            </div>
        );
    };
    const Failed = () => {
        return (
            <div className=' p-10 text-center space-y-8 flex flex-col items-center'>

                <div className={`flex gap-2 items-center lg:text-xl font-semibold justify-center text-primaryRed text-sm`}>
                    <FailedIcon className=' w-4 h-4' />
                    <h1>{t("accountConfirmationFailed")}</h1>
                </div>
                <p>{t("accountConfirmationFailedMessage")}</p>

            </div>
        );
    };

    return (
        <div className='min-h-screen relative flex flex-col justify-center items-center space-y-20'>
            <LanguagesBox />
            <BackofficeLogo />
            {isLoading ?
                <Spinner absolute />
                :
                <div className='max-w-[500px] bg-lightGold  shadow-lg'>
                    {isError ? <Failed /> : <Success />}
                </div>
            }
            <PrimaryButton text="backToLogin" onClick={() => navigate("/login")} />
        </div>
    );
};

export default AccountConfirmation;