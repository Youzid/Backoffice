import { useState } from "react";
import { ReactComponent as UploadImageIcon } from '../../assets/upload-image.svg';
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../api/endpoints";
import { toast } from 'react-hot-toast';

interface UploadImageProps {
  imageUrl:string
  handleImageAdd:(file:File)=> void
  handleImageRemove:()=> void
  handleRemoveEmptyImage?:()=> void
  updateUrl?:string
}

export const ImageUploaderBox = ({imageUrl,handleRemoveEmptyImage, handleImageAdd, handleImageRemove,updateUrl }: UploadImageProps) => {
  const [highlighted, setHighlighted] = useState(false);
  const { t } = useTranslation();
  const allowedExtensions = ['jpg', 'jpeg', 'png'];
  const internalHandleImageAdd = (file: any) => {
    if (file) {
      const extension = file.name?.split('.').pop()?.toLowerCase() || '';
      if (!allowedExtensions.includes(extension)) {
        toast.error(t('wrongExtensionAlert') + allowedExtensions);
        return;
      }

      if (file.size > 50000000) {
        toast.error(t('max_50mb'));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            toast.error('Unable to get canvas context');
            return;
          }
          const maxWidth = 500;
          const maxHeight = 600;
          let width = img.width;
          let height = img.height;

          // Calculate the width and height, maintaining the aspect ratio
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            if (!blob) {
              toast.error('Failed to resize image');
              return;
            }
            const resizedFile = new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() });

            if (resizedFile.size > 150000) {
              toast.error('Image resizing failed. File is larger than 150KB.');
              return;
            }

            handleImageAdd(resizedFile);

          }, 'image/jpeg', 0.7); // Adjust the quality (0.7) as needed
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      onDragOver={() => setHighlighted(true)}
      onDragLeave={() => setHighlighted(false)}
      className={`relative w-[220px] animate-slideup border-primaryColor bg-lightColor  h-[270px] flex justify-center items-center rounded-lg  duration-100 hover:brightness-105 ${highlighted || imageUrl ? "scale-[1.02] brightness-105 " : ""}`}
      style={{
        borderStyle: "dashed",
        borderWidth: "2px",

      }}
    >
      <div className=" h-[250px] w-[200px] flex justify-center items-center">
        <input
          onChange={(event) => internalHandleImageAdd(event.target.files?.[0])}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
          type="file"
          name="images"
          accept=".jpeg,.jpg,.png"
        />
        {/* showing image when i have 1 image and 1 url */}
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt=""
              className="h-[250px] w-[200px] object-cover opacity-60 "
            />
            <button
                type="button"
              className="absolute top-1 end-1 scale-110 hover:bg-primaryRed hover:text-white duration-100  z-50 bg-white rounded-full text-primaryRed "
              onClick={() => { handleImageRemove(); setHighlighted(false); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" fill="currentColor" height="24" viewBox="0 0 24 24">
                <path d="M18.3 5.7c-0.4-0.4-1-0.4-1.4 0L12 10.6 7.1 5.7c-0.4-0.4-1-0.4-1.4 0s-0.4 1 0 1.4l4.9 4.9L5.7 16.9c-0.4 0.4-0.4 1 0 1.4 0.2 0.2 0.5 0.3 0.7 0.3s0.5-0.1 0.7-0.3l4.9-4.9 4.9 4.9c0.2 0.2 0.5 0.3 0.7 0.3s0.5-0.1 0.7-0.3c0.4-0.4 0.4-1 0-1.4L13.4 12l4.9-4.9c0.4-0.4 0.4-1 0-1.4z" stroke="currentColor" strokeWidth="1" />
              </svg>
            </button>
          </>
          // showing image from files endpoint, when i  have  fileName only
        )  : (updateUrl)  ? (
          <>

            <img
              src={`${BASE_URL}/${updateUrl}`}
              alt=""
              className="h-[250px] w-[200px] object-cover opacity-60 "
            />
            <button
              type="button"
              className="absolute top-1 end-1 scale-110 hover:bg-primaryRed hover:text-white duration-100  z-50 bg-white rounded-full text-primaryRed "
              onClick={() => { handleImageRemove(); setHighlighted(false); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" fill="currentColor" height="24" viewBox="0 0 24 24">
                <path d="M18.3 5.7c-0.4-0.4-1-0.4-1.4 0L12 10.6 7.1 5.7c-0.4-0.4-1-0.4-1.4 0s-0.4 1 0 1.4l4.9 4.9L5.7 16.9c-0.4 0.4-0.4 1 0 1.4 0.2 0.2 0.5 0.3 0.7 0.3s0.5-0.1 0.7-0.3l4.9-4.9 4.9 4.9c0.2 0.2 0.5 0.3 0.7 0.3s0.5-0.1 0.7-0.3c0.4-0.4 0.4-1 0-1.4L13.4 12l4.9-4.9c0.4-0.4 0.4-1 0-1.4z" stroke="currentColor" strokeWidth="1" />
              </svg>
            </button>
          </>
        ) :
          <div className="flex flex-col justify-center items-center ">
            <UploadImageIcon className="w-10 h-10  text-primaryColor" />
            {highlighted ?
              <h1 className="text-primaryColor text-[11px] flex gap-1">{t('releaseFile')}</h1>

              :
              <div className="text-primaryBlack text-[11px] flex gap-1">{t('dragImages')} <p className="text-primaryColor">{t('browse')}</p></div>

            }
            <p className="pt-1 text-gray-400 text-[12px] ">{"JPEG, JPG, PNG "}</p>
              {handleRemoveEmptyImage &&
                <button
                type="button"
                  className="absolute top-1 end-1 scale-110 bg-primaryRed hover:scale-105 text-white duration-100  z-50  rounded-full  "
                  onClick={() => { handleRemoveEmptyImage(); }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" fill="currentColor" height="24" viewBox="0 0 24 24">
                    <path d="M18.3 5.7c-0.4-0.4-1-0.4-1.4 0L12 10.6 7.1 5.7c-0.4-0.4-1-0.4-1.4 0s-0.4 1 0 1.4l4.9 4.9L5.7 16.9c-0.4 0.4-0.4 1 0 1.4 0.2 0.2 0.5 0.3 0.7 0.3s0.5-0.1 0.7-0.3l4.9-4.9 4.9 4.9c0.2 0.2 0.5 0.3 0.7 0.3s0.5-0.1 0.7-0.3c0.4-0.4 0.4-1 0-1.4L13.4 12l4.9-4.9c0.4-0.4 0.4-1 0-1.4z" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </button>
              }
          </div>
        }
      </div>
    </div>
  );
};
