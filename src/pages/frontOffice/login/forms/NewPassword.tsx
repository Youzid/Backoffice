import { useNavigate, useParams } from 'react-router-dom';
import { useState } from "react";
import { toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import axios from 'axios';
import endpoints from '../../../../api/endpoints';
import { INewPasswordRequestBody } from '../../../../data/request/INewPasswordRequestBody';
import newPasswordValidation from '../../../../validation/newPasswordValidation';
import SubmitResponseHandler from '../../../../components/common/SubmitResponseHandler';
import InputField from '../../../../components/inputs/InputField';
import PrimaryButton from '../../../../components/buttons/PrimaryButton';
import LanguagesBox from '../../../../components/common/LanguagesBox';
import { t } from 'i18next';
import BackofficeLogo from '../../../../components/common/BackofficeLogo';

const NewPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const initialValues: INewPasswordRequestBody = (
        {
            password: "",
            confirmPassword: ""
        });

    const formik = useFormik({
        initialValues,
        validationSchema: newPasswordValidation,
        onSubmit: async (values: INewPasswordRequestBody) => {
            setIsLoading(true);
            try {
                await axios.post(endpoints.AUTH_NEW_PASSWORD, values, {
                    headers: {
                        'x-api-token': token,
                    },
                });
                toast.success(t("passwordUpdatedSuccess"));
                navigate("/login");
            } catch (err: any) {
                toast.error(<SubmitResponseHandler message={err.response.data?.message} errorCodeStr={err?.response.data?.errorCodeStr} />);
                console.log(err);
            }
            setIsLoading(false);

        }
    });
    return (
        <div className='min-h-screen relative flex flex-col justify-center items-center space-y-10'>
            <LanguagesBox />
            <BackofficeLogo />
            <div className='max-w-[500px]   shadow-lg'>
                <div >
                    <h1 className='text-2xl lg:text-3xl font-semibold text-center pb-3'>{t("newPassword")}</h1>
                </div>
                <form onSubmit={formik.handleSubmit} className='w-[400px] lg:w-[500px] bg-lightGold space-y-10   lg:border p-10 lg:shadow-xl'>
                    <div className=" space-y-6">
                        <InputField fieldName="password" label="newPassword" type="password" placeholder="enterNewPassword" formik={formik} borderStyle="hover:border-primaryGold " />
                        <InputField fieldName="confirmPassword" label="passwordConfirm" type="password" placeholder="confirmPassword" formik={formik} borderStyle="hover:border-primaryGold" />
                    </div>

                    <PrimaryButton type='submit' width="full" onClick={() => formik.handleSubmit()} text='update' isLoading={isLoading} />
                </form>
            </div>
            <PrimaryButton text="backToLogin" onClick={() => navigate("/login")} />
        </div>
    );
};

export default NewPassword;