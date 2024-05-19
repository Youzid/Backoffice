import { useTranslation } from 'react-i18next';
import CloseButton from '../buttons/CloseButton';
import { useFormik } from 'formik';
import { ICategoryRequestBody } from '../../data/request/ICategoryRequestBody';
import InputField from '../inputs/InputField';
import SelectField from '../common/SelectField';
import PrimaryButton from '../buttons/PrimaryButton';
import endpoints from '../../api/endpoints';
import { ICategoryResponseBody } from '../../data/response/ICategoryResponseBody';
import categoryValidation from '../../validation/categoryValidation';
import useHttpRequest from '../../utils/useHttpRequest';
interface CategoryFormModalProps {
    close: () => void;
    refetch: () => void;
    category?: ICategoryResponseBody | null;
}
const CategoryFormModal = ({ close, refetch, category }: CategoryFormModalProps) => {
    const { t } = useTranslation();
    const initialValues: ICategoryRequestBody = (
        {
            name: category?.name || "" ,
            type: category?.type || "" ,
            description: category?.description || "" ,
        });
        const { manualRequest: updateCategory, isLoading: isUpdating } = useHttpRequest({ endpoint: endpoints.CATEGORY_UPDATE_BY_ID_ENDPOINT, method: 'PATCH', });
        const { manualRequest: addCategory, isLoading: isCreating } = useHttpRequest({ endpoint: endpoints.CATEGORY_CREATE_ENDPOINT, method: 'POST', });
    
    const formik = useFormik({
        initialValues,
        validationSchema:categoryValidation,
        onSubmit: async (values: ICategoryRequestBody) => {
            if(category) {
                updateCategory(values,category.id,"categoryUpdated",refetch);
            }else {
                addCategory(values,undefined,"categoryAdded",refetch);
            }
        }
    });
    
    return (
        <>
            <div className={` fixed inset-0  z-[50] animate-slowfade  flex items-center justify-center  `}>
                <div className='relative  lg:text-lg shadow-xl bg-gray-200  z-[1] flex flex-col items-center gap-10 justify-center'>
                    <CloseButton close={close} />
                    <form onSubmit={formik.handleSubmit} className=' w-[400px] lg:w-[800px]   p-10 shadow-xl space-y-4 lg:space-y-7'>
                        <h1 className='lg:text-xl text-center font-semibold'>{category ? t("updateCategory") : t("createCategory")}</h1>
                        <div className='grid grid-cols-2  gap-10 '>
                        <InputField fieldName="name" label="name" type="text" placeholder="enterCategoryName" formik={formik} />
                        <SelectField label='type' selectTxt='selectType'  fieldValue={formik.values.type} fieldName={`type`}  borderStyle='border'   formik={formik}  elementsList={["TOURISTIC","SERVICES"]}  />
                        <InputField fieldName="description" label="description" type="text" placeholder="enterDescription" formik={formik} />
                        </div>
                        <div className='flex justify-end items-center gap-4 max-lg:text-sm'>
                            <PrimaryButton text="cancel" bgColor='#FBEDD8' txtStyle='text-primaryPrimary border border-primaryPrimary ' onClick={() => close()} />
                            <PrimaryButton type="submit" disable={isUpdating || isCreating} text={category ? "update" : "create"} onClick={formik.handleSubmit} />
                        </div>
                    </form>
                </div>
                <div onClick={close} className={` bg-black/20 fixed inset-0 duration-300`}></div>
            </div>
        </>
    );
};
export default CategoryFormModal;