import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import {  useAppSelector } from '../../../../store/store';
import PrevNextSilde from '../../../../components/buttons/PrevNextSilde';
import endpoints, { BASE_URL } from '../../../../api/endpoints';
import axios from 'axios';
import Spinner from '../../../../components/common/Spinner';
import { ImageUploaderBox } from '../../../../components/common/ImageUploadBox';
import PrimaryButton from '../../../../components/buttons/PrimaryButton';
import { ILocationDetailsResponseBody } from '../../../../data/response/ILocationDetailsResponseBody';
import { IImagesLocationRequestBody } from '../../../../data/request/IImagesLocationRequestBody';
import imagesLocationValidation from '../../../../validation/imagesLocationValidation';
import useHttpRequest from '../../../../utils/useHttpRequest';
import { useNavigate } from 'react-router-dom';

interface IImagesLocationForm {
  locationToUpdate?: ILocationDetailsResponseBody;
  refetch: () => void;
}
const ImagesLocationForm = ({ locationToUpdate, refetch }: IImagesLocationForm) => {
  const createdLocation = useAppSelector(state => state.backOffice.createdLocation);
  const maxImages = 10;
  const { t } = useTranslation();
  const [imageUrl, setImageUrl] = useState(['', '', '']);
  const UpdateMode = locationToUpdate?.imageUrls && locationToUpdate?.imageUrls.length > 0;
  const [loadingImages, setLoadingImages] = useState<number[]>([]);

  const allowedExtensions = ['jpg', 'jpeg', 'png'];

  const initialValues: IImagesLocationRequestBody = {
    LocationId: locationToUpdate ? locationToUpdate.id : createdLocation?.id || '',
    Files: ['', '', ''],
  };
  console.log(createdLocation);
  const formik = useFormik({
    initialValues,
    validationSchema: imagesLocationValidation,
    onSubmit: (values: IImagesLocationRequestBody) => {
      const formData: any = new FormData();
      formData.append('LocationId', values.LocationId);
      values.Files.forEach(file => {
        formData.append('Files', file);
      });
      uploadImages(formData);
    },
  });
  const {isLoading:isCreating, manualRequest:createImages} = useHttpRequest( {endpoint: endpoints.LOCATIONS_IMAGES_CREATE_ENDPOINT,method: 'POST',});
  const {isLoading:isUpdating, manualRequest:updateImages} = useHttpRequest( {endpoint: endpoints.LOCATIONS_IMAGES_UPDATE_ENDPOINT,method: 'PATCH',});
  const navigate = useNavigate();

  const refetchAndNavigate = ()=> {
    navigate("/admin/clients");
    refetch();
  };

  const uploadImages = async (formData: FormData) => {
    if (UpdateMode) {
        updateImages(formData,undefined,"photosUpdated",refetchAndNavigate);
      } else {
        createImages(formData,undefined,"photosAdded",refetchAndNavigate);
      }
  };

  const handleImageAdd = (file: any, index: number) => {
    if (file) {
      const extension = file.name?.split('.').pop()?.toLowerCase() || '';
      if (!allowedExtensions.includes(extension)) {
        alert(t('wrongExtensionAlert') + allowedExtensions);
        return;
      }

      if (file.size > 50000000) {
        alert(t('max_50mb'));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        imageUrl[index] = reader.result as string;
        setImageUrl([...imageUrl]);
        formik.setValues((prevValues: any) => {
          const updatedFiles = [...prevValues.Files];
          updatedFiles[index] = file;
          return {
            ...prevValues,
            Files: updatedFiles,
          };
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageRemove = (index: number) => {
    imageUrl[index] = '';
    setImageUrl([...imageUrl]);

    formik.setValues(prevValues => {
      const updatedFiles = [...prevValues.Files];
      updatedFiles[index] = '';
      return {
        ...prevValues,
        Files: updatedFiles,
      };
    });
  };

  const handleAddEmptyImage = () => {
    if (formik.values.Files?.length < maxImages) {
      formik.setValues((prevValues: IImagesLocationRequestBody) => {
        const updatedFiles = [...prevValues.Files];
        updatedFiles.push('');
        return {
          ...prevValues,
          Files: updatedFiles,
        };
      });
    }
  };
  const handleRemoveEmptyImage = (index: number) => {
    formik.setValues((prevValues: IImagesLocationRequestBody) => {
      const updatedFiles = [...prevValues.Files];
      updatedFiles.splice(index, 1);
      return {
        ...prevValues,
        Files: updatedFiles,
      };
    });
    setImageUrl([...imageUrl]);
  };

  const downloadImages = async () => {
    try {
      const downloadedImagesArray: Array<File | null> = [];

      await Promise.all(
        (locationToUpdate?.imageUrls || []).map(async (imageUrl, index) => {
          setLoadingImages(prevLoadingImages => [...prevLoadingImages, index]);

          const response = await axios.get(`${BASE_URL}/${imageUrl}`, {
            responseType: 'arraybuffer',
            headers: { 'Cache-Control': 'no-cache' },
          });
          const blob = new Blob([response.data], { type: response.headers['content-type'] });
          const file = new File([blob], 'downloaded_image.jpg', { type: 'image/jpeg' });

          setLoadingImages(prevLoadingImages => prevLoadingImages.filter(loadingIndex => loadingIndex !== index));
          downloadedImagesArray.push(file);
          handleImageAdd(file, index);
        })
      );
    } catch (error) {
      console.error('Error downloading images:', error);
    }
  };

  useEffect(() => {
    if (locationToUpdate?.imageUrls && locationToUpdate.imageUrls?.length > 0) {
      downloadImages();
    }
    //function can't be a dependency
    // eslint-disable-next-line
  }, [locationToUpdate?.imageUrls, createdLocation]);
  return (
    <div className="px-20">
      <h1 className="lg:text-xl text-center font-semibold">
        {UpdateMode ? (
          <p className="flex justify-center gap-4">
            {t('updatePhotos')} : <p className="font-semibold text-primaryColor">#{locationToUpdate.nameEn}</p>
          </p>
        ) : (
          t('addPhotos')
        )}
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className=" relative  p-10  space-y-4 lg:space-y-7"
      >
        <div className={`grid grid-cols-3 gap-10  justify-center items-center  `}>
          {formik.values.Files.map((image, index) => (
            <div
              key={index}
              className="flex justify-center items-center min-h-[220px] "
            >
              {loadingImages.includes(index) ? (
                <Spinner key={index} />
              ) : (
                <ImageUploaderBox
                  updateUrl={
                    locationToUpdate?.imageUrls &&
                    (formik.values.Files[index] === '' ? '' : locationToUpdate?.imageUrls[index])
                  }
                  imageUrl={imageUrl[index]}
                  handleImageAdd={file => handleImageAdd(file, index)}
                  handleImageRemove={() => handleImageRemove(index)}
                  handleRemoveEmptyImage={() => handleRemoveEmptyImage(index)}
                />
              )}
            </div>
          ))}
          {formik.values.Files?.length < maxImages && (
            <button
              type="button"
              className="w-20 h-20 hover:scale-105 mx-auto bg-gray-300 text-4xl duration-200 text-white hover:bg-primaryColor/70 "
              onClick={handleAddEmptyImage}
            >
              +
            </button>
          )}
        </div>

        {formik.errors.Files && formik.touched.Files && (
          <p className="text-primaryRed absolute bottom-6 text-lg  text-center w-full">{formik.errors.Files}</p>
        )}
        <div className="flex justify-end items-center gap-4 max-lg:text-sm">
          <PrimaryButton
            type="submit"
            isLoading={isCreating || isUpdating}
            text={UpdateMode ? 'update' : 'create'}
            onClick={formik.handleSubmit}
          />
        </div>
      </form>

      {locationToUpdate && <PrevNextSilde />}
    </div>
  );
};

export default ImagesLocationForm;
