import { Outlet, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProfileModal from '../modals/ProfileModal';
import LanguagesBox from '../common/LanguagesBox';
import BOSidebar from '../common/BOSidebar';
const BOLayout = () => {
    const { t } = useTranslation();
    const { pathname } = useLocation();
    const { id } = useParams();
    const isSettings = pathname === "/admin/settings";
    return (
        <>
            <div className='flex flex-col overflow-auto bg-gray-100 max-h-screen'>
                <div className='flex w-full  relative '>
                    {!isSettings &&
                        <BOSidebar />
                    }
                    <div className={`w-full min-h-screen  py-6   flex flex-col gap-y-4 overflow-x-hidden bg-gray-100`}>
                        <div className={`flex   items-center ${isSettings ? " justify-end" : " justify-between"}   p-4`}>
                            {!isSettings &&
                                <h1 className=' text-xl px-12 font-semibold'>{t(pathname?.split("/")[2])} {id && `: #${id}`}</h1>
                            }
                            <div className='flex items-center gap-4' onClick={() => null}>
                                <LanguagesBox />
                                <ProfileModal />
                            </div>
                        </div>
                        <div className='px-10'>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};
export default BOLayout;