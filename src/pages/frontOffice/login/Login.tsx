import React, { useEffect, useState } from 'react';
import AuthForms from './forms/AuthForm';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/store';

import { t } from 'i18next';
import BackofficeLogo from '../../../components/common/BackofficeLogo';

const Login = () => {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const optionChangeCallback = (option: number) => {
    setSelectedOption(option);
  };
  const { isAuthenticated, } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/admin/clients`);
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <div className='relative min-h-screen'    >
      <div className=" h-screen animate-slowfade">
        <div className="h-full w-full flex flex-col items-center justify-center gap-y-2 bg-white">

          <div className="max-w-fit flex flex-col gap-y-2 md:gap-y-4">
            <BackofficeLogo />

            <>
              {selectedOption === 0 &&
                <h1 className="w-full text-center font-bold text-xl md:text-2xl drop-shadow-sm">
                  <p className="w-full text-center text-sm font-semibold">{t("heyThere")}</p>
                  {t("welcomeBack")}
                </h1>
              }

              {selectedOption === 2 &&
                <h1 className="w-full text-center font-bold text-xl md:text-2xl drop-shadow-sm">
                  {t("forgotPassword") + "!"}
                </h1>
              }
            </>


          </div>
          <AuthForms optionValue={selectedOption} handleOptionChange={optionChangeCallback} />
        </div>
      </div>
    </div>
  );
};

export default Login;