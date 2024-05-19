import { Link } from "react-router-dom";
import { ReactComponent as Error404SVG } from '../../assets/error404.svg';
import { t } from "i18next";
import { useAppSelector } from "../../store/store";

const NotFound404 = () => {

  const { isAuthenticated } = useAppSelector((state)=>state.auth);


  return (
    <div className="flex flex-col items-center justify-center h-screen animate-slowfade2">
      <div className="flex flex-col max-w-[400px] items-center">
        <Error404SVG className="w-[340px] md:w-[440px] h-fit text-primaryColor" />
        <h1 className="text-xl md:text-3xl font-bold mb-4 text-primaryGray">{t("notFound.title")}</h1>
        <p className="text-sm md:text-base max-w-xs text-center text-gray-500">{t("notFound.message")}</p>
        <Link to={isAuthenticated ? '/' : '/login'}
          className="bg-primaryColor mt-6 py-2 w-full shadow-xl shadow-lightBlue/80 flex flex-col items-center justify-center rounded-xl text-white hover:-translate-x-1 hover:brightness-110 duration-150"
        >
          {t('backHome')}
        </Link>
      </div>
    </div>
  );
};

export default NotFound404;
