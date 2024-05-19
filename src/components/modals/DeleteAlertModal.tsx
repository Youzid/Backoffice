
import { ReactComponent as DeleteAlertIcon } from '../../assets/deleteAlert.svg';
import endpoints from '../../api/endpoints';
import Spinner from '../common/Spinner';
import { t } from 'i18next';
import useHttpRequest from '../../utils/useHttpRequest';



interface ResourceModalProps {
    id: string;
    onClose: () => void;
    title: string
    refetch: () => void
}

const DeleteAlertModal = ({ id, onClose, title, refetch }: ResourceModalProps) => {
    const { manualRequest: deleteResource, isLoading } = useHttpRequest({ endpoint: endpoints[`${title}_DELETE_BY_ID_ENDPOINT` as keyof typeof endpoints], method: 'DELETE', });
    const refetchAndclose = ()=> {
        refetch();
        onClose();
    };
    const handleDeleteButtonconst = (event: any) => {
        event.preventDefault();
        deleteResource(undefined,id,`${title.toLowerCase()}Deleted`,refetchAndclose);
    };

    return (
        <div className="fixed inset-0 z-50 backdrop-blur-sm flex justify-center items-center">
            <div className="absolute inset-0 bg-lightGray opacity-30"></div>
            <div className="flex flex-col gap-y-6 items-center bg-white rounded-lg p-8 z-10 w-[30%] shadow-primaryBlack/30 shadow-lg">
                <div className="flex flex-col items-center gap-y-3">
                    <DeleteAlertIcon />
                    <h2 className='text-center text-lg text-primaryBlack'>
                        {t('deleteAlert')}
                    </h2>
                </div>
                <div className='w-full flex items-center gap-x-4'>
                    <button
                        onClick={handleDeleteButtonconst}
                        disabled={isLoading}
                        className="w-full flex flex-col items-center justify-center border-2 border-primaryRed bg-primaryRed hover:bg-primaryRed/70 duration-200 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        {isLoading
                            ? (< Spinner />)
                            : (`${t('delete')}`)
                        }
                    </button>
                    <button
                        disabled={isLoading}
                        className="w-full border-2 border-primaryRed duration-200 text-primaryRed font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                        onClick={onClose}
                    >
                        {t('cancel')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAlertModal;
