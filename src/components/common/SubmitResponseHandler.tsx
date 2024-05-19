import { t } from "i18next";


interface SubmitResponseProps {
    errorCodeStr?: string;
    message?:string
  }


const SubmitResponseHandler = ({errorCodeStr,message}:SubmitResponseProps) => {
    const errorMessages: Record<string, string> = {
        Success: `${t("success")}`,
        Unauthorized: `${t("unauthorized")}`,
        Forbidden: `${t("wrongCredentials")}`,
        NotFound: `${t("notFound")}`,
        AlreadyExist: t("accountAlreadyExist"),
        Failed: `${t("failed")}`,
        PasswordPendingApproval:`${t("passwordPendingApproval")}`,
        UserAccountDeactivated:`${t("userAccountDeactivated")}`,
        Constraint: `${t("constraint")}`,
        UnreachableThirdPartyService:`${t("unreachableThirdPartyService")}`,
        WrongExtension:`${t("wrongExtension")}`,
        Fatal:`${t("failed")}`
      };
      let errorMessage = errorCodeStr ?  errorMessages[errorCodeStr] : `${t("failed")}`;

      if (errorCodeStr === 'AlreadyExist'  ) {
        switch (true) {
          case message?.toLocaleLowerCase().includes('location'):
            errorMessage = `${t('locationAlreadyExist')}`;
            break;
          case message?.toLocaleLowerCase().includes('category'):
            errorMessage = `${t('categoryAlreadyExist')}`;
            break;
          default:
            break; 
        }
      }
      if (errorCodeStr === 'Forbidden'  ) {
        switch (true) {
          case message?.toLocaleLowerCase().includes('token'):
            errorMessage = `${t('invalidToken')}`;
            break;
        }
      }
      return <p>{errorMessage}</p>;

};

export default SubmitResponseHandler;
