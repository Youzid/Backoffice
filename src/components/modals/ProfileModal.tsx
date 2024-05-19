import { useEffect, useRef, useState } from 'react';
import { Link, } from 'react-router-dom';
import { useAppSelector } from '../../store/store';
import { ReactComponent as ProfileIcon } from "../../assets/profile.svg";
import { ReactComponent as ArrowIcon } from "../../assets/next.svg";
import { ReactComponent as ProfileModifyIcon } from '../../assets/profileModify.svg';
import { t } from 'i18next';
import LogoutButton from '../buttons/LogOutButton';

const ProfileModal = () => {
    const credentials = useAppSelector((state) => state.auth);
    const modalRef = useRef<HTMLDivElement>(null);
    const [profileMenu, setProfileMenu] = useState<boolean>(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setProfileMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const menuItems = [
        { path: "/admin/profile", icon: <ProfileModifyIcon className='text-primaryColor'/>, label: t("modifyProfile") },
    ];

    return (
        <div ref={modalRef} className='relative z-50'>
            <div onClick={() => setProfileMenu(!profileMenu)} className="text-sm xl:text-base group cursor-pointer group flex hover:text-primaryColor duration-150 gap-3 items-center capitalize pl-4">
                <ProfileIcon className="w-8 h-8 xl:w-12 xl:h-12 rounded-full shadow-sm group-hover:shadow-lg duration-150 text-primaryColor" />
                {credentials.fullname}
                <ArrowIcon className="w-3 h-3 rotate-90 group-hover:translate-y-[2px] duration-150" />
            </div>
            {profileMenu && (
                <div className="divide-y p-4 z-50 top-[48px] max-xl:text-sm xl:top-[64px] -end-10 xl:-end-8 bg-white rounded-2xl border border-lightColor shadow-lg animate-slidedown profile-menu absolute w-72 h-fit flex flex-col items-start ">
                    <div className="w-full flex flex-col gap-y-2 pb-2">
                        {menuItems.map((item, index) => (
                            <Link key={index} to={item.path} className='flex w-full items-center gap-4 group text-primaryColor duration-150 hover:bg-primaryColor/10 p-2 hover:rounded'>
                                {item.icon}
                                <p className='text-primaryBlack group'>{item.label}</p>
                            </Link>
                        ))}
                    </div>
                    <div className="w-full pt-2 flex flex-col gap-y-2">
                        <LogoutButton />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileModal;
