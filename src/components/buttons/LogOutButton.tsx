import { Link } from "react-router-dom";
import { ReactComponent as LogOutIcon } from "../../assets/logout.svg";
import { t } from "i18next";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { removeCredentials } from "../../store/features/authSlice";
import { axiosInstance } from "../../api/axios";
import endpoints from "../../api/endpoints";
import SubmitResponseHandler from "../common/SubmitResponseHandler";
import { toast } from "react-hot-toast";

interface Props{
  txtStyle?:string
}
const LogoutButton = ({txtStyle}:Props) => {
  const dispatch = useAppDispatch();

  const {token } = useAppSelector((state)=>state.auth);

  const handleLogout = async () => {
        try {
          axiosInstance.post(endpoints.AUTH_LOGOUT_ENDPOINT + token);
            dispatch(removeCredentials());
        } catch (err:any) {
          if (err.response && err.response.status !== 403) {
            toast.error(<SubmitResponseHandler message={err.response.data?.message} errorCodeStr={err?.response.data?.errorCodeStr} />);
        }        }
};
  return (
    <div className="relative w-full">
      <span className='w-full bg-gray-300 h-[1px] absolute -top-1  start-0 '></span>
      <Link to="/login"
        className={`flex text-gray-600  group font-semibold w-full items-center gap-5 hover:gap-3 group  duration-150  p-2 rounded  ${txtStyle ? txtStyle : "hover:bg-primaryRed hover:text-white"}`}
        onClick={() => handleLogout()}
      >
        <LogOutIcon className="w-6 h-6 text-primaryRed group-hover:text-white " />
        {t("logOut")}
      </Link>
    </div>
  );
};

export default LogoutButton;