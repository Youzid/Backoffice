import React, {useState } from "react";
import { useFormik } from "formik";
import { ILoginRequestBody } from "../../../../data/request/ILoginRequestBody";
import toast from "react-hot-toast";
import loginValidation from "../../../../validation/loginValidation";
import InputField from "../../../../components/inputs/InputField";
import { ReactComponent as EmailIcon } from "../../../../assets/email.svg";
import { ReactComponent as PasswordIcon } from "../../../../assets/passwordKey.svg";
import endpoints from "../../../../api/endpoints";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, } from '../../../../store/store';
import { setCredentials } from "../../../../store/features/authSlice";
import axios from "axios";
import PrimaryButton from "../../../../components/buttons/PrimaryButton";
import { t } from "i18next";
import SubmitResponseHandler from "../../../../components/common/SubmitResponseHandler";

interface Props {
    handleOptionChange: (option: number) => void;
}

const LoginForm: React.FC<Props> = ({ handleOptionChange }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const initialValues: ILoginRequestBody = {
        pseudo: "",
        password: "",
    };

    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues,
        validationSchema: loginValidation,
        onSubmit: async (values: ILoginRequestBody) => {
            try {
                setLoading(true);
                const response = await axios.post(endpoints.AUTH_LOGIN_ENDPOINT, values);
                dispatch(setCredentials(response.data.response));
                setLoading(false);
                navigate("/");
            } catch (err: any) {
                toast.error(<SubmitResponseHandler message={err.response.data?.message} errorCodeStr={err?.response.data?.errorCodeStr} />);
                setLoading(false);
                console.log(err);
            }
        },
    });

    return (
        <section className="w-full h-fit flex flex-col gap-2 md:gap-20 items-center justify-center text-lg animate-slowfade">
            <form onSubmit={formik.handleSubmit} className="w-full p-8 md:p-8">
                <div className="space-y-6 md:space-y-8 w-full">
                    {["pseudo", "password"].map((fieldName) => (
                        <InputField
                            key={fieldName}
                            Icon={getIcon(fieldName)}
                            fieldName={fieldName}
                            label=""
                            type={getFieldType(fieldName)}
                            placeholder={`enter${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`}
                            formik={formik}
                            borderStyle="hover:border-primaryColor"
                        />
                    ))}
                    <div className={` pb-6 flex items-center justify-between text-base`}>
                        <div
                            onClick={(e: any) => {
                                e.preventDefault();
                                handleOptionChange(2);
                            }}
                            className="font-bold text-primaryColor underline text-sm cursor-pointer"
                        >
                            {t("forgotPassword")}
                        </div>
                    </div>
                </div>
                <PrimaryButton type="submit" width="full" onClick={formik.handleSubmit} text="connect" isLoading={loading} />
            </form>
        </section>
    );
};

const getIcon = (fieldName: string) => {
    const icons: Record<string, JSX.Element> = {
        pseudo: <EmailIcon className={`start-2 w-5 scale-90 h-fit absolute bottom-[18px] duration-150 text-gray-600 `} />,
        password: <PasswordIcon className={`start-2 w-5 h-fit absolute bottom-[18px] duration-150 text-gray-600`} />,
    };
    return icons[fieldName];
};

const getFieldType = (fieldName: string) => {
    const fieldTypes: Record<string, "text" | "password"> = {
        pseudo: "text",
        password: "password",
    };
    return fieldTypes[fieldName];
};

export default LoginForm;
