import { useTranslation } from "react-i18next";
import { Toaster } from "react-hot-toast";
import toastCustomOptions from "../utils/toastCustomOptions";
interface props {
    supportedLanguages: string[];
    app: JSX.Element;
};

const RTLComponent: React.FC<props> = ({ supportedLanguages, app }) => {

    const { i18n } = useTranslation();

    return (
        <div style={supportedLanguages.includes(i18n.language.toLocaleLowerCase()) ? { direction: 'rtl' } : {}}>
            {app}
            <Toaster toastOptions={toastCustomOptions} position="bottom-center" />
        </div>
    );
};

export default RTLComponent;