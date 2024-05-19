import { useTranslation } from 'react-i18next';
import CloseButton from '../buttons/CloseButton';
import { useFormik } from 'formik';
import { IUsersResponseBody } from '../../data/response/IUsersResponseBody';
import { IUsersRequestBody } from '../../data/request/IUsersRequestBody';
import usersUpdateValidation from '../../validation/usersUpdateValidation';
import usersValidation from '../../validation/usersValidation';
import InputField from '../inputs/InputField';
import SelectField from '../common/SelectField';
import PrimaryButton from '../buttons/PrimaryButton';
import endpoints from '../../api/endpoints';
import useHttpRequest from '../../utils/useHttpRequest';
interface UsersFormModalProps {
    close: () => void;
    refetch: () => void;
    user?: IUsersResponseBody | null;
}
const UsersFormModal = ({ close, refetch, user }: UsersFormModalProps) => {
    const { t } = useTranslation();
    const initialValues: IUsersRequestBody = (
        {
            username: user?.username || "" ,
            firstName: user?.firstName || "" ,
            lastName: user?.lastName || "" ,
            email: user?.email || "" ,
            password:  null,
            language: user?.language || "", 
            isActivated:user?.isActivated || false
        });
        
    const { manualRequest: updateUser, isLoading: isUpdating } = useHttpRequest({ endpoint: endpoints.USERS_UPDATE_BY_ID_ENDPOINT, method: 'PATCH', });
    const { manualRequest: addUser, isLoading: isCreating } = useHttpRequest({ endpoint: endpoints.USERS_CREATE_ENDPOINT, method: 'POST', });

    const formik = useFormik({
        initialValues,
        validationSchema: user ? usersUpdateValidation : usersValidation,
        onSubmit: async (values: IUsersRequestBody) => {
            if(user) {
                updateUser(values,user.id,"userUpdated",refetch);
            }else {
                addUser(values,undefined,"userAdded",refetch);
            }
        }
    });
    
    return (
        <>
            <div className={` fixed inset-0  z-[50] animate-slowfade  flex items-center justify-center  `}>
                <div className='relative  lg:text-lg shadow-xl bg-gray-50  z-[1] flex flex-col items-center gap-10 justify-center'>
                    <CloseButton close={close} />
                    <form onSubmit={formik.handleSubmit} className=' w-[400px] lg:w-[800px]   p-10 shadow-xl space-y-4 lg:space-y-7'>
                        <h1 className='lg:text-xl text-center font-semibold'>{user ? t("updateUser") : t("addUser")}</h1>
                        <InputField fieldName="username" label="username" type="text" placeholder="enterUsername" formik={formik} />
                        <div className='grid grid-cols-2  gap-10 '>
                        <InputField fieldName="firstName" label="firstName" type="text" placeholder="enterFirstName" formik={formik} />
                        <InputField fieldName="lastName" label="lastName" type="text" placeholder="enterLastName" formik={formik} />
                        <InputField fieldName="email" label="email" type="text" placeholder="enterEmail" formik={formik} />
                        {!user &&
                        <InputField fieldName="password" label="password" type="password" placeholder="enterPassword" formik={formik} />
                        }
                        <SelectField label='language' selectTxt='selectLanguage'  fieldValue={formik.values.language} fieldName={`language`} borderStyle='border'   formik={formik}  elementsList={["En","Fr"]}  />
                        </div>
                        <div className='flex justify-end items-center gap-4 max-lg:text-sm'>
                            <PrimaryButton text="cancel" bgColor='#FBEDD8' txtStyle='text-primaryPrimary border border-primaryPrimary ' onClick={() => close()} />
                            <PrimaryButton type="submit" disable={isUpdating || isCreating} text={user ? "update" : "create"} onClick={formik.handleSubmit} />
                        </div>
                    </form>
                </div>
                <div onClick={close} className={` bg-black/20 fixed inset-0 duration-300`}></div>
            </div>
        </>
    );
};
export default UsersFormModal;