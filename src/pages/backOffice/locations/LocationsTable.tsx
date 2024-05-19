import React, { useState } from 'react';
import { begin, rowsPerPage } from '../../../utils/rowsPerPage';
import { useAppSelector } from '../../../store/store';
import endpoints, { BASE_URL } from '../../../api/endpoints';
import ActionsMenu from '../../../components/menus/ActionsMenu';
import { t } from 'i18next';
import Pagination from '../../../components/common/Pagination';
import EmptyData from '../../../components/common/EmptyData';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import { ReactComponent as AddIcon } from "../../../assets/add.svg";
import DeleteAlertModal from '../../../components/modals/DeleteAlertModal';
import SearchBox from '../../../components/common/SearchBox';
import { ILocationResponseBody } from '../../../data/response/ILocationResponseBody';
import LocationViewModal from '../../../components/modals/LocationViewModal';
import { useNavigate } from 'react-router-dom';
import useHttpRequest from '../../../utils/useHttpRequest';
import getTranslatedValue from '../../../utils/getTranslatedValue';

interface ILocationsTableProps {
  locationType:string
}
const LocationsTable = ({locationType}:ILocationsTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedViewElement, setSelectedViewElement] = useState<ILocationResponseBody | null>();
  const [selectedDeleteElement, setSelectedDeleteElement] = useState<string | null>();

  const { isLoading, isError, data: locationsList, pageCount, manualRequest: refetch } = useHttpRequest<ILocationResponseBody[]>({
    endpoint: endpoints.LOCATIONS_GET_LIST_ENDPOINT,
    method: 'GET',
    params: { categoryType: locationType?.toUpperCase(), search: searchTerm, begin: begin(currentPage, rowsPerPage), count: rowsPerPage },
  });

  const permissions = useAppSelector((state) => state.auth.permissions);

  const navigate = useNavigate();
  const [toggleOptions, setToggleOptions] = useState(-1);
  return (
    <div className="w-full">
      <div className='flex items-center justify-end gap-4 py-2'>
        <PrimaryButton icon={<AddIcon />} text={t("addProperty")} onClick={() => navigate(`/admin/${locationType}-form`) } />
        <SearchBox searchBy="search"   searchTerm={searchTerm} setSearchTerm={(value) => setSearchTerm(value)}/>
      </div>
      <div className=' flex flex-col items-center '>

        {(!isLoading) && (locationsList && locationsList?.length > 0) ?
          <table className=" w-full   text-sm ">
            <thead>
              <tr className='text-gray-500'>
                <th className={`px-2 text-start sm:px-3 py-3 leading-4 tracking-wider`}>{t("photo")}</th>
                <th className={`px-2 text-start sm:px-3 py-3 leading-4 tracking-wider`}>{t("name")}</th>
                <th className={`px-2 text-start sm:px-3 py-3 leading-4 tracking-wider`}>{t("address")}</th>
                <th className={`px-2 text-start sm:px-3 py-3 leading-4 tracking-wider`}>{t("category")}</th>
                <th className={`px-2 text-start sm:px-3 py-3 leading-4 tracking-wider`}>{t("rating")}</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {locationsList?.map((location, index) => (
                <tr key={index} >
                 <td className={` px-2 sm:px-3 py-5`}> <img className='w-10 h-14  object-cover' src={`${BASE_URL}/${location.imageUrl}`}/></td>
                 <td className={` px-2 sm:px-3 py-5`}>{getTranslatedValue(location?.nameAr,location?.nameFr,location?.nameEn)}</td>
                 <td className={` px-2 sm:px-3 py-5`}>{getTranslatedValue(location?.addressAr,location?.address,location?.address)}</td>
                 <td className={` px-2 sm:px-3 py-5`}>{t(location.categoryName)}</td>
                 <td className={` px-2 sm:px-3 py-5`}>{location.rating || "-"}</td>
                 <td className={`relative px-6 py-5`}>
                    <ActionsMenu toggleOptions={toggleOptions} setToggleOptions={(index) => setToggleOptions(index)} elementIndex={index} permissions={permissions?.user}
                    setSelectedEditElement={() => navigate(`/admin/${locationType}-form`, { state: location })}
                    setSelectedViewElement={() => setSelectedViewElement(location)}
                      setSelectedDeleteElement={()=>setSelectedDeleteElement(location.id) }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          :
          <EmptyData isError={isError} title={locationType} isLoading={isLoading} dataLength={locationsList?.length || 0} />
        }
        {rowsPerPage &&
          < Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(pageCount / rowsPerPage)}
            onChange={(page: number) => setCurrentPage(page)}
          />
        }
        {selectedViewElement &&
          <LocationViewModal location={selectedViewElement} close={() => setSelectedViewElement(null)} />
        }
        {selectedDeleteElement &&
          <DeleteAlertModal title='LOCATIONS' id={selectedDeleteElement} refetch={refetch} onClose={() => setSelectedDeleteElement(null)} />
        }
      </div>
    </div>
  );
};
export default LocationsTable;