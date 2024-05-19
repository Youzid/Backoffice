import * as Yup from 'yup';
import '../utils/i18n';
import { t } from 'i18next';


const newPasswordValidation:Yup.Schema<any> =  Yup.object({
  password: Yup.string().max(255, `${t("maxCharachters_255")}`).min(5,`${t("minCharachters_5")}`).required(`${t('required')}`),
  confirmPassword: Yup.string()
  .oneOf([Yup.ref('password'), ''], `${t("passwordMatchmErr")}`)
  .required(`${t('required')}`),
});



export default newPasswordValidation;