import React, { useState } from 'react';
import { settingsStructure } from './settingsStructure';
import { useAppSelector } from '../../../store/store';
import BackArrowButton from '../../../components/buttons/BackArrowButton';
import { t } from 'i18next';
import BackofficeLogo from '../../../components/common/BackofficeLogo';

const Settings = () => {

  const activeButtonStyle = "w-[240px] rounded-lg text-left px-4 bg-primaryColor text-white  py-2 shadow-md shadow-primaryBlack/10 duration-150 text-center text-lg";
  const inActiveButtonStyle = "w-[240px] rounded-lg text-left px-4 bg-white text-primaryBlack/80  py-2 shadow-md shadow-primaryBlack/10 hover:bg-primaryColor hover:text-white duration-150 text-center text-lg";

  const permissions = useAppSelector((state) => state.auth.permissions);
  const [toggleSettings, setToggleSettings] = useState<number>(0);

  return (
    <div className="px-10" >
      <div className='h-full w-full flex flex-col overflow-auto'>
        <div className={`absolute top-20 start-[400px] group z-50 gap-4 text-primaryBlack text-xl font-semibold`}>
          <BackArrowButton styles='top-0 -start-10' path='/admin/clients' />
          <h1>{t("settings")}</h1>
        </div>
        {
          <div className="py-4 flex gap-x-11 relative overflow-x-hidden">
            <div className=' space-y-4'>
              <BackofficeLogo />
              <div className='space-y-4'>
                {settingsStructure.map((section, index) => (
                  <div key={index} className=' space-y-4'>
                    {
                      permissions && permissions[section.requiredPermissions]?.includes(section.requiredActions) && (
                        <button className={`${toggleSettings === index ? activeButtonStyle : inActiveButtonStyle}`}
                          onClick={() => { setToggleSettings(index); }}>
                          {t(section.title)}
                        </button>
                      )
                    }
                  </div>
                ))}
              </div>
            </div>
            {React.createElement(settingsStructure[toggleSettings].component)}
          </div>
        }
      </div>
    </div>
  );
};

export default Settings;
