import React,{useState} from 'react';
import { useTranslation } from 'react-i18next';
import { begin, rowsPerPage } from '../../../../utils/rowsPerPage';
import ActionsMenu from '../../../../components/menus/ActionsMenu';
import Pagination from '../../../../components/common/Pagination';

import { useAppSelector } from '../../../../store/store';
import PrimaryButton from '../../../../components/buttons/PrimaryButton';
import EmptyData from '../../../../components/common/EmptyData';
import endpoints from '../../../../api/endpoints';
import { IUsersResponseBody } from '../../../../data/response/IUsersResponseBody';
import UserDetailsModal from '../../../../components/modals/UserDetailsModal';
import UsersFormModal from '../../../../components/modals/UsersFormModal';
import useHttpRequest from '../../../../utils/useHttpRequest';

const ManageUsers = () => {

const permissions = useAppSelector((state)=>state.auth.permissions);

  const {t} =useTranslation();
  const [toggleOptions, setToggleOptions] = useState(-1);
  const [isUserForm, setIsUserForm] = useState<boolean> (false);
  const [selectedEditUser, setSelectedEditUser] = useState<IUsersResponseBody | null>();
  const [selectedUser, setSelectedUser] = useState<IUsersResponseBody | null>();
  const [currentPage, setCurrentPage] = useState(1);

  const { isLoading, isError, data: usersList, pageCount, manualRequest: refetch } = useHttpRequest<IUsersResponseBody[]>({
    endpoint: endpoints.USERS_GET_USERS_LIST_WITHOUT_CURRENT_USER,
    method: 'GET',
    params: { begin: begin(currentPage, rowsPerPage), count: rowsPerPage },
  });

  const {manualRequest:handleActivateUser} = useHttpRequest( {endpoint: endpoints.USERS_ACTIVATE_BY_ID_ENDPOINT,method: 'PATCH',});
  const {manualRequest:handleDeActivateUser} = useHttpRequest( {endpoint: endpoints.USERS_DEACTIVATE_BY_ID_ENDPOINT,method: 'PATCH',});

  const handleCloseForm = () => {
    setSelectedEditUser(null);
    setIsUserForm(false);
};
const handleUpdateCategory = (user: IUsersResponseBody) => {
    setSelectedEditUser(user);
    setIsUserForm(true);
};
    return (
      <div className='w-full bg-white px-2 py-4'>
        <div className='flex justify-end pb-10'>
          <PrimaryButton icon onClick={()=> setIsUserForm(true)} text='addUser' />
        </div>
        <div className="w-full flex flex-col items-center">
        {(isLoading) || (usersList && usersList?.length < 1) ?
          <EmptyData isError={isError}  title="users" isLoading={isLoading} dataLength={usersList?.length || 0} />
          :
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-lightPrimary text-start  leading-4 font-medium text-gray-500  tracking-wider">{t("username")}</th>
                <th className="px-6 py-3 bg-lightPrimary text-start  leading-4 font-medium text-gray-500  tracking-wider">{t("email")}</th>
                <th className="px-6 py-3 bg-lightPrimary text-start  leading-4 font-medium text-gray-500  tracking-wider">{t("status")}</th>
                <th className="px-6 py-3 bg-lightPrimary text-start  leading-4 font-medium text-gray-500  tracking-wider">{t("action")}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usersList?.map((user, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-no-wrap">{user.username}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{user.email}</td>
                  <td className="px-6  whitespace-no-wrap"><div className={` h-10 rounded-full flex items-center justify-center  ${user.isActivated ? "bg-green-100 text-green-600" : "bg-primaryRed/20 text-primaryRed"}`}>{user.isActivated ? t("active") : t("blocked")}</div></td>
                  <td className="px-6 py-4 whitespace-no-wrap relative">
                    <ActionsMenu toggleOptions={toggleOptions} setToggleOptions={(index) => setToggleOptions(index)} elementIndex={index} permissions={permissions?.user}
                      handleActivate={() => handleActivateUser(undefined,user.id,"userActivated",refetch)}
                      handleDeactivate={() => handleDeActivateUser(undefined,user.id,"userBlocked",refetch)}
                      setSelectedViewElement={()=>setSelectedUser(user)}
                      status={user.isActivated ? "activate" : "deactivate"}
                      setSelectedEditElement={() => handleUpdateCategory(user)}
                      />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          }
        {rowsPerPage &&
          < Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(pageCount / rowsPerPage)}
            onChange={(page: number) => setCurrentPage(page)}
          />
        }
      {selectedUser &&
                <UserDetailsModal user={selectedUser}  close={() => setSelectedUser(null)} />
            }
            {isUserForm &&
                   <UsersFormModal user={selectedEditUser}  close={handleCloseForm} refetch={refetch} />
            }
    </div>
    </div>
    );
};

export default ManageUsers;