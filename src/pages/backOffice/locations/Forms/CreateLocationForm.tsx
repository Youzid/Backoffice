import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import InputField from '../../../../components/inputs/InputField';
import PrimaryButton from '../../../../components/buttons/PrimaryButton';
import PrevNextSilde from '../../../../components/buttons/PrevNextSilde';
import SelectField from '../../../../components/common/SelectField';
import { axiosInstance } from '../../../../api/axios';
import endpoints from '../../../../api/endpoints';
import SubmitResponseHandler from '../../../../components/common/SubmitResponseHandler';
import { handleLocationCreation, handleStepChange } from '../../../../store/features/BackOfficeSlice';
import { ILocationDetailsResponseBody } from '../../../../data/response/ILocationDetailsResponseBody';
import { ILocationRequestBody } from '../../../../data/request/ILocationRequestBody';
import { ICategoryResponseBody } from '../../../../data/response/ICategoryResponseBody';
import locationServiceValidation from '../../../../validation/locationValidation';
import MapComponent from '../../../../components/common/MapComponent';
import getTranslatedValue from '../../../../utils/getTranslatedValue';


interface ILocationFormProps {
    locationToUpdate?: ILocationDetailsResponseBody
    locationType:string
    refetch: () => void
}
const CreateLocationForm = ({ locationToUpdate,locationType, refetch }: ILocationFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [categoriesList, setCategoriesList] = useState<ICategoryResponseBody[]>();
    useEffect(() => {
      setIsLoading(true);
      axiosInstance
        .get(endpoints.CATEGORY_GET_LIST_ENDPOINT +`?type=${locationType.toUpperCase()}`)
        .then((response) => {
            setCategoriesList(response.data.response);
        })
        .catch((err) => {
          if (err.response && err.response.status !== 403) {
            toast.error(<SubmitResponseHandler message={err.response.data?.message} errorCodeStr={err?.response.data?.errorCodeStr} />);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, [locationType]);

    const formStep = useAppSelector((state) => state.backOffice.formStep);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const createLocation = async (values: ILocationRequestBody) => {
        setIsLoading(true);
        try {
            const createdLocation = await axiosInstance.post(endpoints.LOCATIONS_CREATE_ENDPOINT, values);
            dispatch(handleLocationCreation(createdLocation.data.response));
            toast.success(t("locationCreated"));
            dispatch(handleStepChange(formStep + 1));
        } catch (err: any) {
            if (err.response && err.response.status !== 403) {
                toast.error(<SubmitResponseHandler message={err.response.data?.message} errorCodeStr={err?.response.data?.errorCodeStr} />);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const updateLocation = async (values: ILocationRequestBody, id: string) => {
        setIsLoading(true);
        try {
            await axiosInstance.patch(endpoints.LOCATIONS_UPDATE_BY_ID_ENDPOINT + id, values);
            toast.success(t("locationUpdated"));
            refetch();
            dispatch(handleStepChange(formStep + 1));
        } catch (err: any) {
            if (err.response && err.response.status !== 403) {
                toast.error(<SubmitResponseHandler message={err.response.data?.message} errorCodeStr={err?.response.data?.errorCodeStr} />);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const initialValues: ILocationRequestBody = (
        {
            categoryId: locationToUpdate && locationToUpdate.categoryId || "",
            nameAr: locationToUpdate && locationToUpdate.nameAr || "",
            nameFr: locationToUpdate && locationToUpdate.nameFr || "",
            nameEn: locationToUpdate && locationToUpdate.nameEn || "",
            descriptionAr: locationToUpdate && locationToUpdate.descriptionAr || "",
            descriptionFr: locationToUpdate && locationToUpdate.descriptionFr || "",
            descriptionEn: locationToUpdate && locationToUpdate.descriptionEn || "",
            latitude: locationToUpdate && locationToUpdate.latitude || "",
            longitude: locationToUpdate && locationToUpdate.longitude || "",
            address: locationToUpdate && locationToUpdate.address || "",
            addressAr: locationToUpdate && locationToUpdate.addressAr || "",
        });
    const formik = useFormik({
        initialValues,
        validationSchema: locationServiceValidation,
        onSubmit: (values) => {
            if (locationToUpdate) {
                updateLocation(values, locationToUpdate.id);
            } else {
                createLocation(values);
            }
        }
    });

    console.log(formik.errors);
    return (
        <div className=' px-20'>
            <h1 className='lg:text-xl text-center font-semibold'>{locationToUpdate ? <p className='flex justify-center gap-4'>{t("updateProperty")} : <p className='font-semibold text-orange-400'>#{getTranslatedValue(locationToUpdate?.nameAr,locationToUpdate?.nameFr,locationToUpdate?.nameEn)}</p></p> : t("addProperty")}</h1>
            <form onSubmit={formik.handleSubmit} className=' p-10  space-y-4 lg:space-y-10'>
                <div className='grid grid-cols-2 gap-5'>
                    <InputField fieldName="nameAr"  height='10' borderStyle='border' label="nameAr" type="text" placeholder="nameAr" formik={formik} />
                    <InputField fieldName="nameFr"  height='10' borderStyle='border' label="nameFr" type="text" placeholder="nameFr" formik={formik} />
                    <InputField fieldName="nameEn" height='10' borderStyle='border' label="nameEn" type="text" placeholder="nameEn" formik={formik} />
                    <SelectField addLink='/admin/settings' height='10' selectTxt='select_category' optionShow='name' optionValue='id' fieldName="categoryId" borderStyle='border' label='category' handleSelectChange={(e) => formik.setValues((prevValues) => ({ ...prevValues, categoryId: e }))} fieldValue={formik.values.categoryId} elementsList={categoriesList} formik={formik} />
                    <InputField borderStyle='border'  height='20' fieldName="descriptionAr" label="descriptionAr" type="text" placeholder="enterDescription" formik={formik} />
                    <InputField borderStyle='border'  height='20' fieldName="descriptionFr" label="descriptionFr" type="text" placeholder="enterDescription" formik={formik} />
                    <InputField borderStyle='border'  height='20' fieldName="descriptionEn" label="descriptionEn" type="text" placeholder="enterDescription" formik={formik} />
                </div>

                <div className='bg-white border p-6 shadow-xl space-y-10 rounded-lg'>
                    <MapComponent formik={formik} />
                    <div className='grid grid-cols-2 gap-5'>
                        <InputField height='10' fieldName="latitude" borderStyle='border' label="latitude" type="number" placeholder="enterLatitude" formik={formik} />
                        <InputField height='10' fieldName="longitude" borderStyle='border' label="longitude" type="number" placeholder="enterLongitude" formik={formik} />
                        <InputField height='10' fieldName="address" borderStyle='border' label="address" type="text" placeholder="enterAddress" formik={formik} />
                        <InputField height='10' fieldName="addressAr" borderStyle='border' label="addressAr" type="text" placeholder="enterAddressAr" formik={formik} />
                    </div>
                </div>
                <div className='flex justify-end items-center gap-4 max-lg:text-sm'>
                    <PrimaryButton type="submit" isLoading={isLoading} text={locationToUpdate ? "update" : "create"} onClick={formik.handleSubmit} />
                </div>
            </form>

            {locationToUpdate &&
                <PrevNextSilde />
            }
        </div>
    );
};

export default CreateLocationForm;