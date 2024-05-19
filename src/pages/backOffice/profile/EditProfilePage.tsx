import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import Spinner from '../../../components/common/Spinner';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import profileValidation from '../../../validation/profileValidation';
import resetPasswordValidation from '../../../validation/resetPasswordValidation';
import InputField from '../../../components/inputs/InputField';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import { IProfileRequestBody } from '../../../data/request/IProfileRequestBody';
import endpoints from '../../../api/endpoints';
import { IProfileResponse } from '../../../data/response/IProfileResponse';
import { setCredentials } from '../../../store/features/authSlice';
import useHttpRequest from '../../../utils/useHttpRequest';


const EditProfilePage = () => {

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth);

    const { t } = useTranslation();


    const { isLoading, isError, data, manualRequest: refetch } = useHttpRequest<IProfileResponse>({
        endpoint: endpoints.USERS_GET_OWN_INFO_ENDPOINT,
        method: 'GET',
      });
    
      const {manualRequest:updateUserProfile} = useHttpRequest( {endpoint: endpoints.USERS_UPDATE_OWN_ENDPOINT,method: 'PATCH',});
      const {manualRequest:updateUserPassword} = useHttpRequest( {endpoint: endpoints.AUTH_NEW_PASSWORD,method: 'POST',});


    const initialValues: IProfileRequestBody = {
        username: data && data.username || '',
        firstName: data && data.firstName || '',
        lastName: data && data.lastName || '',
        email: data && data.email || '',
        language: user.language || 'Fr',
    };

    const editProfileFormik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: profileValidation(t),
        onSubmit: async (values: IProfileRequestBody) => {
            const refetchAndDispatch = ()=> {
                refetch();
                dispatch(setCredentials({
                    ...user,
                    username: editProfileFormik.values?.username || user.username,
                    fullname: editProfileFormik.values?.firstName + " " + editProfileFormik.values?.lastName || user.fullname,
                    email: editProfileFormik.values?.email || user.email,}));
            };
            updateUserProfile(values,undefined,"profileUpdated",refetchAndDispatch);
        },
    });

    const resetPasswordFormik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: resetPasswordValidation,
        onSubmit: async (values: { password: string; confirmPassword: string }) => {
            updateUserPassword(values,undefined,"passwordChanged",refetch);
        },
    });

    return (
        <section className='bg-lightestGreen animate-slowfade'>
            {
                data ?
                    <div className='flex flex-col items-center justify-center'>
                        {/*edit Profile*/}
                        <form className='px-4 lg:w-2/3 w-full pt-6 lg:pt-12 flex flex-col gap-6 lg:gap-8 max-lg:items-center '>
                            {isError && (
                                <div className='h-fit w-fit text-center bg-lightGreen text-sm lg:text-base text-red-500'>{t('error.http')}</div>
                            )}
                            <div className='w-full flex flex-col gap-4 lg:gap-6'>
                                <div className='grid lg:gap-x-20 gap-y-8 grid-cols-1 lg:grid-cols-2'>
                                    <InputField fieldName='username' label='username' borderStyle='border' type='text' placeholder='enterUsername' formik={editProfileFormik} />
                                    <InputField fieldName='firstName' label='firstName' borderStyle='border' type='text' placeholder="firstName" formik={editProfileFormik} />
                                    <InputField fieldName='lastName' label='lastName' borderStyle='border' type='text' placeholder="lastName" formik={editProfileFormik} />
                                    <InputField fieldName='email' label='email' borderStyle='border' type='email' placeholder='user@email.com' formik={editProfileFormik} />
                                    <InputField fieldName='phone' label='phone' borderStyle='border' type='text' placeholder="phone" formik={editProfileFormik} />
                                </div>
                                <div className='flex justify-end items-center gap-4'>
                                    <PrimaryButton text='cancel' bgColor='#EDF1EC' txtStyle='text-primaryGreen border border-primaryGreen' onClick={() => editProfileFormik.setValues(initialValues)} />
                                    <PrimaryButton type='submit' isLoading={isLoading} text='update' onClick={editProfileFormik.handleSubmit} />
                                </div>
                            </div>
                        </form>

                        {/*Password Form */}
                        <form className='w-full lg:w-2/3 px-4 py-16 flex flex-col gap-6 lg:gap-8 max-lg:items-center'>
                            <h3 className="text-lg lg:text-xl text-start h-fit w-full drop-shadow-sm font-bold text-primaryBlack">
                                {t("createNewPassword")}
                            </h3>
                            <div className='flex flex-col gap-14 w-full'>
                                <div className='grid gap-x-20 gap-y-8 grid-cols-1 lg:grid-cols-2'>
                                    <InputField fieldName='password' label='password' borderStyle='border' type='password' placeholder='enterPassword' formik={resetPasswordFormik} />
                                    <InputField
                                        fieldName='confirmPassword'
                                        label='confirmPassword'
                                        borderStyle='border'
                                        type='password'
                                        placeholder='confirmPassword'
                                        formik={resetPasswordFormik}
                                    />
                                </div>
                                <div className='flex justify-end items-center gap-4'>
                                    <PrimaryButton type='submit' isLoading={isLoading} text={t("update")} onClick={resetPasswordFormik.handleSubmit} />
                                </div>
                            </div>
                        </form>
                    </div>
                    :
                    <Spinner />
            }
        </section>
    );
};

export default EditProfilePage;
