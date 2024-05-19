import {useEffect, useRef, useState } from "react";
import { ReactComponent as UserIcon } from '../../../../assets/user2.svg';
import { ReactComponent as MenuArrowsIcon } from '../../../../assets/menuArrows.svg';
import { ReactComponent as SearchIcon } from '../../../../assets/search.svg';
import { ReactComponent as CheckedMarkIcon } from '../../../../assets/checkMark.svg';
import { axiosInstance } from "../../../../api/axios";
import endpoints from "../../../../api/endpoints";
import Spinner from "../../../../components/common/Spinner";
import SubmitResponseHandler from "../../../../components/common/SubmitResponseHandler";
import PermissionCheckBox from "../../../../components/buttons/PermissionCheckBox";
import FullPermissionsAlertModal from "../../../../components/modals/FullPermissionsAlertModal";
import toast from "react-hot-toast";
import { handlePermissionAutoSelect } from "../handlePermissionAutoSelect";
import { t } from "i18next";
import { ReactComponent as EmptyDataSVG } from '../../../../assets/emptySvg.svg';
import EmptyData from "../../../../components/common/EmptyData";


interface Permissions {
    [key: string]: string | null;
}

interface User {
    username: string,
    permissions: object;
}

const PermissionsSettings = () => {

    const [isLoading, setIsLoading] = useState<number>(0);
    const [fetchError, setFetchError] = useState<string>('');
    const [inputError, setInputError] = useState<boolean>(false);


    const [selectedUserName, setSelectedUserName] = useState<string>('');
    const [usersMenuOn, setUsersMenuOn] = useState<boolean>(false);
    const [refetch, setRefetch] = useState<boolean>(false);
    const [usersList, setUsersList] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedAction, setSelectedAction] = useState({action:"",checked:false});
    const menuRef = useRef<HTMLDivElement>(null);

    const filteredData = usersList.filter((user) =>
        user.username.toString().toLowerCase().includes(searchTerm.toLowerCase()));

    const [permissions, setPermissions] = useState<{ username: string, permissions: Permissions; }>({ username: '', permissions: {} });
    useEffect(() => {
        if (selectedUserName) {
            setInputError(false);
            setIsLoading(2);
            axiosInstance
                .get(endpoints.USERS_GET_PERMISSIONS_BY_USERNAME_ENDPOINT + selectedUserName)
                .then(response => {
                    setFetchError("");
                    setPermissions({
                        username: selectedUserName,
                        permissions: response.data.response.permissions
                    });
                })
                .catch(err => {
                    if (err.response && err.response.status !== 403) {
                        setFetchError(err.message);
                        toast.error(<SubmitResponseHandler message={err.response.data?.message} errorCodeStr={err?.response.data?.errorCodeStr} />);
                    }
                })
                .then(() => {
                    setIsLoading(0);
                });
        }
    }, [selectedUserName, refetch]);

    const handleCheckboxChange = (permission: string, action: string) => {
        const updatedPermissions = { ...permissions?.permissions };
         updatedPermissions[permission] = action;
         setPermissions({ username: selectedUserName, permissions: updatedPermissions });
         return updatedPermissions;
    };

    const handleApplyPermissions = async () => {
        if (selectedUserName) {
            setIsLoading(3);
            try {
                await axiosInstance.patch(endpoints.USERS_UPDATE_PERMISSIONS_WITH_USERNAME_ENDPOINT, permissions);
                setIsLoading(0);
                toast.success(t("permissionsUpdated"));
            } catch (err: any) {
                    if (err.response && err.response.status !== 403) {
                        setFetchError(err.message);
                        toast.error(<SubmitResponseHandler message={err.response.data?.message} errorCodeStr={err?.response.data?.errorCodeStr} />);
                    }
            }
            setIsLoading(0);
        } else {
            setInputError(true);
        }
    };
    useEffect(() => {
        setIsLoading(1);
        axiosInstance
            .get(endpoints.USERS_GET_USERS_LIST_WITHOUT_CURRENT_USER)
            .then(response => {
                setIsLoading(0);
                setUsersList(response.data.response);
            })
            .catch(err => {
                if (err.response && err.response.status !== 403) {
                    setFetchError(err.message);
                    toast.error(<SubmitResponseHandler message={err.response.data?.message} errorCodeStr={err?.response.data?.errorCodeStr} />);
                }
            })
            .then(() => {
                setIsLoading(0);
            });

        // handling clicking outside menu
        const handleOutsideClick = (event: any) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setUsersMenuOn(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);


    const handleSelectedUser =(user:User)=> {
         setSelectedUserName(user.username);
          setUsersMenuOn(false);
    };
    const AutoCRUDInput: React.FC<{ action: string }> = ({ action }) => {
       if( selectedUserName) {
        return (
            <div className="relative flex-col flex items-center gap-1">
            <input
                    type="checkbox"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all before:absolute before:top-2/4 before:start-2/4 before:block before:h-9 before:w-9 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-Color-gray-500 before:opacity-0 before:transition-opacity checked:border-primaryColor checked:bg-white checked:before:bg-Color-500 hover:before:opacity-10"
                    checked={allChecked(action)}
                    onChange={(e)=>setSelectedAction({action:action,checked:e.target.checked})}
                />
                {allChecked(action) &&
                    <CheckedMarkIcon className="absolute bottom-8 w-5 p-[2px] pointer-events-none text-primaryColor" />
                }
                {t(`${action}`)}
                </div>
        );
       }else{
        return null;
       }
    };

    function allChecked(action:string,) {
        const requiredCharacter = action.charAt(0).toUpperCase();

        for (const permission in permissions.permissions) {
          if (!permissions.permissions[permission]?.includes(requiredCharacter)) {
            return false;
          }
        }
      
        return true;
      }

     return (
        <div className="min-h-[550px] w-full animate-slowfade bg-white py-4 pb-20">
  
                        <>

                                {(!isLoading) && (usersList && usersList?.length > 0) ?

                                    (
                                        <div className="h-full first-letter:w-full mx-3 rounded-md ">
                                            <div className={`w-full flex justify-between px-24 items-center p-2  `}>
                                                <div className={`flex items-center gap-1 `}>
                                                    <div className={` px-3 flex items-center gap-1 `}><h3 className="text-base font-semibold">{t("user")}</h3>:</div>
                                                    <UserIcon className="w-10 h-10" />

                                                    <div className="relative   ">
                                                        <div className={`flex cursor-pointer items-center gap-4 group `} onClick={() => setUsersMenuOn(!usersMenuOn)}>
                                                            <p className={`group-hover:text-primaryColor duration-150 text-primaryBlack font-semibold ${selectedUserName ? "text-primaryColor" : "text-primaryGray"} ${inputError && " text-primaryRed"}`}>{selectedUserName ? selectedUserName : t("selectUser")}</p>
                                                            <MenuArrowsIcon className=" text-[#9E9E9E] duration-100  group-hover:text-primaryColor" />
                                                        </div>
                                                        {usersMenuOn && (
                                                            <div ref={menuRef} className="absolute  bg-white shadow-lg rounded-md w-[325px]  space-y-6 px-4 z-10 py-4 duration-150  ">
                                                                <span className="flex justify-center  items-center relative  ">
                                                                    <SearchIcon className={`absolute w-4  pointer-events-none end-12 `} />
                                                                    <input
                                                                        type="text"
                                                                        value={searchTerm}
                                                                        onChange={(event) => setSearchTerm(event.target.value)}
                                                                        placeholder={`${t("searchUser")}`}
                                                                        className={` text-primaryGray font-normal   shadow-md shadow-black/5   mx-8   w-full border text-sm  placeholder:placeholder-primaryGray rounded-md p-3 px-4 outline-none focus:border-primaryGray duration-150`}
                                                                    />
                                                                </span>
                                                                <div className="space-y-3 max-h-[380px] overflow-auto" style={{ scrollbarWidth: 'thin' }}>
                                                                    {filteredData.map((user, i: any) => (
                                                                        <div key={i} className=" flex items-center p-1 gap-2 hover:bg-primaryColor/20 rounded-md cursor-pointer" onClick={() => handleSelectedUser(user)}>
                                                                            <UserIcon className="w-9 h-9" />
                                                                            <p className="text-primaryBlack font-semibold">{user.username}</p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                </div>
                                                <div className={`gap-4 flex  duration-500 ${selectedUserName ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                                                    <button className="   duration-200 w-32 h-12  font-bold py-2 px-4 bg-primaryColor text-white hover:brightness-105  rounded-md flex items-center justify-center" onClick={handleApplyPermissions}>
                                                        {isLoading === 3
                                                            ? (< Spinner />)
                                                            : (`${t('apply')}`)
                                                        }</button>
                                                    <button className="duration-200 w-32 h-12  font-bold py-2 px-4 bg-gray-100  rounded-md " onClick={() => setRefetch(!refetch)}>{t("cancel")}</button>
                                                </div>
                                            </div >
                                            {
                                                isLoading === 2 ?
                                                    (
                                                        <div className="h-full w-full translate-y-4 flex flex-col justify-center items-center">
                                                        <Spinner />
                                                    </div>
                                                    ) : (
                                                        <table className="h-full min-w-full border-gray-300 animate-slowfade">
                                                            <thead>
                                                                <tr className={`bg-lightGray flex `}>
                                                                    <th className="flex flex-col items-center justify-center w-full py-2 px-4 border-b font-medium text-lg bg-gray-100">{t('permissions')}</th>
                                                                    <th className="flex flex-col items-center justify-center w-full py-2 px-4 border-b font-medium text-lg bg-gray-100">{<AutoCRUDInput action="create"/>} </th>
                                                                    <th className="flex flex-col items-center justify-center w-full py-2 px-4 border-b font-medium text-lg bg-gray-100">{<AutoCRUDInput action="read"/>}</th>
                                                                    <th className="flex flex-col items-center justify-center w-full py-2 px-4 border-b font-medium text-lg bg-gray-100">{<AutoCRUDInput action="update"/>}</th>
                                                                    <th className="flex flex-col items-center justify-center w-full py-2 px-4 border-b font-medium text-lg bg-gray-100">{<AutoCRUDInput action="delete"/>}</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {(!selectedUserName) ?
                                                                    (
                                                                        <div className="w-full flex flex-col py-16 justify-center  items-center">
                                                                            <EmptyDataSVG className="text-primaryColor" />
                                                                            <h1 className="text-lg">{t("noUserSelected")}</h1>
                                                                        </div>
                                                                    ) : (Object.entries(permissions?.permissions).map(([permission, actions], i) => (
                                                                        <tr key={permission}
                                                                            className={`flex items-center  ${i % 2 === 0 ? 'bg-white ' : 'bg-gray-50  rounded !important'}  `}
                                                                        >
                                                                            <td className="w-full flex flex-col justify-center h-[61px] px-4 border-b font-medium">{t(`${permission}`)}</td>
                                                                            <td className="w-full h-[61px] flex flex-col justify-center px-4 border-b items-center">
                                                                                <PermissionCheckBox
                                                                                    actions={actions}
                                                                                    permission={permission}
                                                                                    targetAction="C"
                                                                                    requiredAction="R"
                                                                                    handleCheckboxChange={handleCheckboxChange}
                                                                                />
                                                                            </td>
                                                                            <td className="w-full h-[61px] flex flex-col justify-center px-4 border-b items-center">
                                                                                <PermissionCheckBox
                                                                                    actions={actions}
                                                                                    permission={permission}
                                                                                    targetAction="R"
                                                                                    requiredAction=""
                                                                                    handleCheckboxChange={handleCheckboxChange}
                                                                                />
                                                                            </td>
                                                                            <td className="w-full h-[61px] flex flex-col justify-center px-4 border-b items-center">
                                                                                <PermissionCheckBox
                                                                                    actions={actions}
                                                                                    permission={permission}
                                                                                    targetAction="U"
                                                                                    requiredAction="RC"
                                                                                    handleCheckboxChange={handleCheckboxChange}
                                                                                />
                                                                            </td>
                                                                            <td className="w-full h-[61px] flex flex-col justify-center px-4 border-b items-center">
                                                                                <PermissionCheckBox
                                                                                    actions={actions}
                                                                                    permission={permission}
                                                                                    targetAction="D"
                                                                                    requiredAction="RC"
                                                                                    handleCheckboxChange={handleCheckboxChange}
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                    )))}
                                                            </tbody>
                                                        </table>
                                                    )
                                            }
                                        </div >
                                    ) : (
                                        <EmptyData  isError={!!fetchError} title="users" isLoading={isLoading === 1} dataLength={usersList?.length || 0} />
                                    )

                            }
                        </>
            {selectedAction.action &&
            <FullPermissionsAlertModal action={selectedAction.action} user={selectedUserName} checked={selectedAction.checked}  onClose={()=> setSelectedAction({action:"",checked:false})} handlePermissionAutoSelect={(action,checked) => {setPermissions({username:selectedUserName,permissions:handlePermissionAutoSelect(action, checked,permissions.permissions)}) ;setSelectedAction({action:"",checked:false});}}/>
            }
        </div>
    );
};

export default PermissionsSettings;