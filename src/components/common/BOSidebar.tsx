import { ReactComponent as ClientsIcon } from "../../assets/sidebar/clients.svg";
import { ReactComponent as SettingsIcon } from "../../assets/sidebar/setting.svg";
import { ReactComponent as TouristicsIcon } from "../../assets/sidebar/services.svg";
import { ReactComponent as ServicesIcon } from "../../assets/sidebar/services.svg";
import { Link, useLocation } from 'react-router-dom';
import { t } from 'i18next';
import BackofficeLogo from "./BackofficeLogo";

const BOSidebar = () => {
    const { pathname } = useLocation();
    const SidebarElements = [
        {
            title: "manageClients",
            icon: <ClientsIcon />,
            path: "/clients"
        },
        {
            title: "manageAttractions",
            icon: <TouristicsIcon />,
            path: "/touristic"
        },
        {
            title: "manageServices",
            icon: <ServicesIcon />,
            path: "/services"
        },
        {
            title: "settings",
            icon: <SettingsIcon />,
            path: "/settings"
        },
    ];


    return (
        <div className='w-[380px]  bg-white  py-4'>
            <BackofficeLogo />
            <div className='flex flex-col gap-5 px-4 pt-20'>
                {SidebarElements.map((element, i) => (
                    <Link to={`/admin${element.path}`} className={`flex items-center gap-3 text-gray-600  duration-150 rounded-md p-3 px-6 text-lg  ${pathname === `/admin${element.path}` ? "bg-primaryColor text-white" : "bg-transparent hover:bg-primaryColor/30 hover:gap-4 "}`} key={i}>
                        {element.icon}
                        <h1>{t(element.title)}</h1>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BOSidebar;