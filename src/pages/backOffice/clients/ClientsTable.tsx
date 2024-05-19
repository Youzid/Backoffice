import React, { useState} from 'react';
import { begin, rowsPerPage } from '../../../utils/rowsPerPage';
import { useAppSelector } from '../../../store/store';
import endpoints from '../../../api/endpoints';
import ActionsMenu from '../../../components/menus/ActionsMenu';
import { t } from 'i18next';
import Pagination from '../../../components/common/Pagination';
import EmptyData from '../../../components/common/EmptyData';
import { IClientsResponseBody } from '../../../data/response/IClientsResponseBody';
import ClientViewModal from '../../../components/modals/ClientViewModal';
import SearchBox from '../../../components/common/SearchBox';
import useHttpRequest from '../../../utils/useHttpRequest';

const ClientsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedViewElement, setSelectedViewElement] = useState<IClientsResponseBody | null>();
  
  const { isLoading, isError, data: clientsList, pageCount, manualRequest: refetch } = useHttpRequest<IClientsResponseBody[]>({
    endpoint: endpoints.CLIENTS_GET_LIST_ENDPOINT,
    method: 'GET',
    params: {search:searchTerm, begin: begin(currentPage, rowsPerPage), count: rowsPerPage },
}
);

  const permissions = useAppSelector((state) => state.auth.permissions);

  const {manualRequest:handleToggleClient} = useHttpRequest( {endpoint: endpoints.CLIENTS_ACTIVATE_BY_ID_ENDPOINT,method: 'POST',});

  const [toggleOptions, setToggleOptions] = useState(-1);
  return (
    <div className="w-full">
      <div className='flex items-center justify-end py-2'>
        <SearchBox searchBy="search"   searchTerm={searchTerm} setSearchTerm={(value) => setSearchTerm(value)}/>
      </div>
      <div className=' flex flex-col items-center '>

        {(!isLoading) && (clientsList && clientsList?.length > 0) ?
          <table className=" w-full  text-sm ">
            <thead>
              <tr>
                <th className={`px-2 text-start sm:px-3 py-3 leading-4 font-bold tracking-wider`}>{t("fullName")}</th>
                <th className={`px-2 text-start sm:px-3 py-3 leading-4 font-bold tracking-wider`}>{t("email")}</th>
                <th className={`px-2 text-start sm:px-3 py-3 leading-4 font-bold tracking-wider`}>{t("status")}</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {clientsList?.map((client, index) => (
                <tr key={index} className='font-semibold'>
                 <td className={` px-2 sm:px-3 py-5`}>{client.firstName} {client.lastName}</td>
                 <td className={` px-2 sm:px-3 py-5`}>{client.email}</td>
                 <td className="px-6  whitespace-no-wrap"><div className={` h-10 rounded-full flex items-center justify-center  ${client.isActivated ? "bg-green-100 text-green-600" : "bg-primaryRed/20 text-primaryRed"}`}>{client.isActivated ? t("active") : t("blocked")}</div></td>
                 <td className={`relative px-6 py-5`}>
                    <ActionsMenu toggleOptions={toggleOptions} setToggleOptions={(index) => setToggleOptions(index)} elementIndex={index} permissions={permissions?.user}
                      setSelectedViewElement={() => setSelectedViewElement(client)}
                      handleActivate={() => handleToggleClient({status:true},client.id,"clientActivated",refetch)}
                      handleDeactivate={() => handleToggleClient({status:false},client.id,"clientBlocked",refetch)}
                      status={client.isActivated ? "activate" : "deactivate"}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          :
          <EmptyData isError={isError} title="clients" isLoading={isLoading} dataLength={clientsList?.length || 0} />
        }
        {rowsPerPage &&
          < Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(pageCount / rowsPerPage)}
            onChange={(page: number) => setCurrentPage(page)}
          />
        }
        {selectedViewElement &&
          <ClientViewModal client={selectedViewElement} close={() => setSelectedViewElement(null)} />
        }
      </div>
    </div>
  );
};
export default ClientsTable;