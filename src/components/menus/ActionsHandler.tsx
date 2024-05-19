
import { ReactComponent as AddIcon } from '../../assets/CRUD/plus.svg';
import { ReactComponent as EditIcon } from '../../assets/CRUD/update.svg';
import { ReactComponent as DeleteIcon } from '../../assets/CRUD/delete.svg';
import { ReactComponent as ValidIcon } from '../../assets/CRUD/valid.svg';
import { ReactComponent as Deactivate } from '../../assets/CRUD/deactivate.svg';
import { ReactComponent as VisibleIcon } from '../../assets/passwordOn.svg';
import { ReactComponent as InvisibleIcon } from '../../assets/passwordOff.svg';
import { IActionsProps } from './ActionsMenu';
import { t } from 'i18next';


const ActionsHandler: React.FC<IActionsProps> = ({
    permissions,
    status,handleActivate,handleDeactivate,
    handleVisible,handleInvisible,
    handlePay,
    handleCancel,
    setSelectedEditElement,
    setSelectedViewElement,
    setSelectedDeleteElement,
    setSelectedAddElement,
    setSelectedDetailsElement
}) => {

    const handleEditClick = () => {
        setSelectedEditElement &&  setSelectedEditElement();
    };

    const handleDeleteClick = () => {
        setSelectedDeleteElement && setSelectedDeleteElement();
    };

 
    return (
        <div className="flex justify-center items-center relative z-50 ">
            <div
                className={`absolute top-0 end-6 w-[180px] h-fit bg-white shadow-md rounded-lg flex justify-center items-start flex-col`}
            >
                {            
                            <>
                               
                                {
                                    (permissions?.includes('R') && setSelectedViewElement) &&
                                    <button
                                        className="flex justify-start hover:bg-gray-600/80 duration-150 group hover:text-white text-gray-600  items-center gap-x-2 w-[180px] h-[33.33px]  px-2 rounded "
                                        onClick={setSelectedViewElement}
                                    >
                                        <VisibleIcon className='w-4 ' />
                                        <h1 className='group-hover:text-white'>{t('view')}</h1>
                                    </button>
                                }
                                {
                                    (permissions?.includes('R') && setSelectedDetailsElement) &&
                                    <button
                                        className="flex justify-start hover:bg-gray-600/80 duration-150 group hover:text-white text-gray-600  items-center gap-x-2 w-[180px] h-[33.33px]  px-2 rounded"
                                        onClick={setSelectedDetailsElement}
                                    >
                                        <VisibleIcon className='w-4 ' />
                                        <h1 className='group-hover:text-white'>{t('details')}</h1>
                                    </button>
                                }
                                {
                                    (permissions?.includes('C') && setSelectedAddElement) &&
                                    <button
                                        className="flex justify-start hover:bg-primaryGold/80 duration-150 group hover:text-white text-primaryGold   items-center gap-x-2 w-[180px] h-[33.33px] hover:bg-lightBlue px-2 rounded"
                                        onClick={setSelectedAddElement}
                                    >
                                        <AddIcon className='w-4 ' />
                                        <h1 className='group-hover:text-white'>{t('add')}</h1>
                                    </button>
                                }
                                {
                                    (permissions?.includes('U') && setSelectedEditElement) &&
                                    <button
                                        className="flex justify-start hover:bg-orange-400/80 duration-150 group hover:text-white text-orange-400   items-center gap-x-2 w-[180px] h-[33.33px] hover:bg-lightBlue px-2 rounded"
                                        onClick={handleEditClick}
                                    >
                                        <EditIcon className='w-4 ' />
                                        <h1 className='group-hover:text-white'>{t('update')}</h1>
                                    </button>
                                }
                                
                                {
                                    (permissions?.includes('U') && status?.toLowerCase()!=="activate" && handleActivate)  &&
                                    <button
                                    className={` flex  justify-start hover:bg-green-400 duration-150 group hover:text-white text-green-400   items-center gap-x-2 w-[180px] h-[33.33px]  px-2 rounded `}
                                    onClick={()=> handleActivate()}
                                    >
                                        <ValidIcon className='w-4 ' />
                                        <h1  className='group-hover:text-white text-base font-medium'>{t('activate')}</h1>
                                    </button>
                                }
                                {
                                    (permissions?.includes('D') && status?.toLowerCase()!=="deactivate" && handleDeactivate)  &&
                                    <button
                                    className={` flex  justify-start hover:bg-primaryRed/80 duration-150 group hover:text-white text-primaryRed   items-center gap-x-2 w-[180px] h-[33.33px] hover:bg-lightBlue px-2 rounded `}
                                    onClick={()=> handleDeactivate()}
                                    >
                                        <Deactivate className='w-4 ' />
                                        <h1  className='group-hover:text-white text-base font-medium'>{t('deactivate')}</h1>
                                    </button>
                                }
                                {
                                    (permissions?.includes('U') && status?.toLowerCase()!=="visible" && handleVisible)  &&
                                    <button
                                    className={` flex  justify-start hover:bg-green-900/80 duration-150 group hover:text-white text-green-800   items-center gap-x-2 w-[180px] h-[33.33px]  px-2 rounded `}
                                    onClick={()=> handleVisible()}
                                    >
                                        <VisibleIcon className='w-4 ' />
                                        <h1  className='group-hover:text-white text-base font-medium'>{t('visible')}</h1>
                                    </button>
                                }
                                {
                                    (permissions?.includes('D') && status?.toLowerCase()!=="invisible" && handleInvisible)  &&
                                    <button
                                    className={` flex  justify-start hover:bg-gray-300 duration-150 group hover:text-white text-gray-500  items-center gap-x-2 w-[180px] h-[33.33px]  px-2 rounded `}
                                    onClick={()=> handleInvisible()}
                                    >
                                        <InvisibleIcon className='w-4 ' />
                                        <h1  className='group-hover:text-white text-base font-medium'>{t('invisible')}</h1>
                                    </button>
                                }

{
                                    (permissions?.includes('U') && status?.toLowerCase()!=="pay" && handlePay)  &&
                                    <button
                                    className={` flex  justify-start hover:bg-green-400 duration-150 group hover:text-white text-green-400   items-center gap-x-2 w-[180px] h-[33.33px]  px-2 rounded `}
                                    onClick={()=> handlePay()}
                                    >
                                        <ValidIcon className='w-4 ' />
                                        <h1  className='group-hover:text-white text-base font-medium'>{t('pay')}</h1>
                                    </button>
                                }
                                {
                                    (permissions?.includes('D') && status?.toLowerCase()!=="cancel" && handleCancel)  &&
                                    <button
                                    className={` flex  justify-start hover:bg-primaryRed/80 duration-150 group hover:text-white text-primaryRed   items-center gap-x-2 w-[180px] h-[33.33px] hover:bg-lightBlue px-2 rounded `}
                                    onClick={()=> handleCancel()}
                                    >
                                        <Deactivate className='w-4 ' />
                                        <h1  className='group-hover:text-white text-base font-medium'>{t('cancel')}</h1>
                                    </button>
                                }

                                {
                                    (permissions?.includes('D') && setSelectedDeleteElement) &&
                                    <button
                                    className="flex justify-start hover:bg-primaryRed/80 duration-150 group hover:text-white   text-primaryRed items-center gap-x-2 w-[180px] h-[33.33px] hover:bg-lightBlue px-2 rounded"
                                    onClick={handleDeleteClick}
                                    >
                                        <DeleteIcon className='w-3' />
                                        <h1  className='group-hover:text-white'>{t('delete')}</h1>
                                    </button>
                                }
                            </>
                }
            </div>
        </div >
    );
};

export default ActionsHandler;
