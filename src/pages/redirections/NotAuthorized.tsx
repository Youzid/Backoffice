import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ReactComponent as Error403SVG } from '../../assets/error403.svg';
import { t } from "i18next";
import { useAppDispatch } from "../../store/store";
import { removeCredentials } from "../../store/features/authSlice";

const NotAuthorized = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(removeCredentials());
        // eslint-disable-next-line
    }, []);
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen animate-slowfade2">
                <Error403SVG className="text-primaryColor"/>
                <Link to={'/login'}
                    className="bg-primaryColor mt-4 py-2 w-[200px] shadow-xl shadow-lightBlue/80 flex flex-col items-center justify-center rounded-md text-white hover:shadow-lightBlue duration-150"
                >
                    {t('login')}
                </Link>
            </div>
        </>
    );
};

export default NotAuthorized;
