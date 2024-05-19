import LoginForm from "./LoginForm";
import ResetPasswordForm from "./ResetPasswordForm";

interface Props {
    optionValue: number;
    handleOptionChange: (option: number) => void;
}

const AuthForms: React.FC<Props> = ({ optionValue, handleOptionChange }) => {

    return (

        <div className="md:w-[550px] w-full">
            {optionValue === 0 && <LoginForm handleOptionChange={handleOptionChange} />}
            {optionValue === 2 && <ResetPasswordForm handleOptionChange={handleOptionChange} />}
        </div>

    );
};

export default AuthForms;