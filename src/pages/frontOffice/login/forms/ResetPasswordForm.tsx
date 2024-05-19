import React, { useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from 'yup';
import SecondaryButton from "../../../../components/buttons/PrimaryButton";
import InputField from "../../../../components/inputs/InputField";
import { ReactComponent as EmailIcon } from "../../../../assets/email.svg";
import endpoints from "../../../../api/endpoints";
import axios from "axios";
import { t } from "i18next";
import ValidateEmailModal from "../../../../components/modals/ValidateEmailModal";
import SubmitResponseHandler from "../../../../components/common/SubmitResponseHandler";

interface Props {
    handleOptionChange: (option: number) => void;
}

const ResetPasswordForm: React.FC<Props> = ({ handleOptionChange }) => {

    const [validateEmailPopup, setValidateEmailPopup] = useState<boolean>(false);

    const initialValues = (
        {
            email: "",
        });

    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({ email: Yup.string().email(`${t("invalidEmail")}`).required(`${t('required')}`) }),
        // eslint-disable-next-line
        onSubmit: async (values) => {

            try {
                // TODO : POST request and save response
                // TODO : add auth infos to context
                const response = await axios.post(endpoints.AUTH_RECOVER_PASSWORD_ENDPOINT + values.email);
                console.log(response);
                setValidateEmailPopup(true);
                setLoading(false);
            } catch (err: any) {
                if (err.response && err.response.status !== 403) {
                    toast.error(<SubmitResponseHandler message={err.response.data?.message} errorCodeStr={err?.response.data?.errorCodeStr} />);
                    setLoading(false);
                    console.log(err);

                }

            }
        }
    });


    return (
        <section className='w-full h-fit flex flex-col gap-2 md:gap-20 items-center justify-center text-lg animate-slowfade2'>
            <form onSubmit={formik.handleSubmit} className='w-full p-4 md:p-8 space-y-5'>
                <div className="space-y-2 md:space-y-4 w-full">
                    <InputField Icon={<EmailIcon className={`start-2 w-5 scale-90 h-fit absolute bottom-[18px] duration-150 text-gray-600 `} />}
                        fieldName="email"
                        label=""
                        type="text"
                        placeholder="enterEmail" formik={formik} borderStyle="hover:border-primaryGold "
                    />
                    <div
                        onClick={(e: any) => {
                            e.preventDefault();
                            handleOptionChange(0);
                        }}
                        className="font-bold text-primaryColor underline text-sm cursor-pointer"
                    >
                        {t("login")}
                    </div>
                </div>
                <SecondaryButton type='submit' width="full" onClick={() => formik.handleSubmit()} text='resetPassword' isLoading={loading} />
            </form>
            {validateEmailPopup &&
                <ValidateEmailModal backToLogin={() => handleOptionChange(0)} close={() => setValidateEmailPopup(false)} />
            }

        </section>
    );
};

export default ResetPasswordForm;