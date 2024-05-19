import { useState } from "react";
import { ReactComponent as UploadFileIcon } from '../../assets/upload-file.svg';
import { ReactComponent as CancelIcon } from '../../assets/X.svg';
import fileIcon  from '../../assets/file.svg';
import { megaByteConverter } from "../../utils/megaByteConverter";
import { t } from "i18next";

interface UploadFileProps {
  fileUrl: string;
  handleFileAdd: (event: any) => void;
  handleFileRemove: () => void;
  error:boolean,
  rawFile?:File
  progressBar:number
  cancelUpload?:() => void
}
export const FileUploaderBox = ({ fileUrl,error, handleFileAdd, handleFileRemove , rawFile,progressBar,cancelUpload }: UploadFileProps) => {
  const [highlighted, setHighlighted] = useState(false);
  return (
    <div className="relative flex flex-col items-center ">
    <div
      onDragOver={() => setHighlighted(true)}
      onDragLeave={() => setHighlighted(false)}
      className={`relative w-[215px]   min-h-[200px] flex justify-center items-center rounded-lg ${error ? "border-primaryColor/50" : "border-primaryColor/50"}  duration-100 group  ${highlighted || fileUrl ? "scale-[1.02] brightness-105 " : ""}`}
      style={{
        borderStyle: "dashed",
        borderWidth: "2px",

      }}
    >

      <div className="bg-gray-200 group-hover:bg-gray-200/50 duration-150 h-[200px] w-full rounded-lg flex justify-center items-center ">
        <input
          onChange={(event) => {handleFileAdd(event);}}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
          type="file"
          name="file"
          accept=".csv"
        />
        {/* showing file when i have 1 file and 1 url */}
        {fileUrl && rawFile ? (
          <>
            <img
              src={rawFile.type.includes("image") ? fileUrl :fileIcon}
              alt=""
              className={`h-[195px] w-[205px] object-cover opacity-60 rounded-md `}
            />
            <button
              className="absolute top-1 end-1 p-2 scale-50 hover:bg-primaryRed hover:text-white duration-100  z-50 bg-white rounded-full text-primaryRed "
              onClick={() => { handleFileRemove(); setHighlighted(false); }}
            >
              <CancelIcon/>
            </button>
          </>
          // showing file from files endpoint, when i  have  fileName only 
        ) :
          <div className="flex flex-col justify-center items-center">
            <UploadFileIcon width={40} className={`group-hover:-translate-y-[3px] text-primaryColor ${highlighted && "-translate-y-[3px]"} duration-150 `} />
            {highlighted ?
              <h1 className="text-primaryColor text-[11px] flex gap-1">{t('releaseFile')}</h1>

              :
              <div className="text-primaryBlack text-[11px] flex gap-1">{t('dragFiles')} <p className="text-primaryColor">{t('browse')}</p></div>

            }
            <p className="text-primaryBlack/50 text-[8px] pt-1 text-center flex flex-col ">{t("supportedFormats")} :<span>CSV</span></p>
          </div>
        }
      </div>
    </div>
    {rawFile &&
        <div className="w-full">
            <p className=" text-center mx-auto  pt-2 text-xs flex justify-center items-center gap-2 w-fit"><p className="text-primaryColor ">{rawFile.name}</p>  { megaByteConverter(rawFile.size)}</p>
          <div className={`flex items-center gap-2 duration-300 ${progressBar > 0 ? " opacity-100" : " opacity-0 pointer-events-none delay-300"}`}>
            <div className={`h-[2px] w-full z-50 ${progressBar >0 ?"bg-gray-200": "bg-yellow-600"} rounded overflow-hidden mt-2 duration-150 `}>
              <div
                className={`h-full ${progressBar > 0 ? " bg-primaryColor" : " bg-yellow-600"} duration-150 `}
                style={{ width: `${progressBar}%` }}
              />
            </div>
            <CancelIcon onClick={cancelUpload} className="translate-y-[3px] bg-slate-400 rounded-full w-3 h-3 p-[1px] hover:bg-primaryRed text-white duration-200 cursor-pointer"/>
          </div>
        </div>
    
    }
    </div>
  );
};
