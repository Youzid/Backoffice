import { t } from 'i18next';
import PrimaryButton from '../buttons/PrimaryButton';
import Spinner from '../common/Spinner';
import { ReactComponent as EmptySVG } from '../../assets/emptySvg.svg';

interface IEmptyDataProps {
    handleClick?: () => void;
    permission?: string;
    fetchError?: string;
    title: string;
    isLoading: boolean;
    dataLength?: number;
    absolute?: boolean
    isError?: boolean

}
const EmptyData = ({ title, isError, absolute, isLoading, dataLength, permission, handleClick }: IEmptyDataProps) => {

    return (
        <div>
            {isLoading ?
                <Spinner absolute={absolute} />
                :
                isError ? <h1 className='text-primaryRed text-center lg:text-xl'>{t("failed")}</h1>
                    : (
                        dataLength !== undefined && dataLength < 1 && (
                            <div className='flex flex-col items-center gap-3 lg:gap-8'>
                                <EmptySVG className='text-primaryColor w-36 h-fit' />
                                <p className='text-lg'>{t(`empty_${title}`)} </p>
                                {handleClick && permission?.includes("U") &&
                                    < PrimaryButton onClick={() => handleClick()} text={t(`add_${title}`)} />
                                }
                            </div>
                        )
                    )
            }
        </div>
    );
};

export default EmptyData;
