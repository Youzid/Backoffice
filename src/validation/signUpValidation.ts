import * as Yup from 'yup';
import '../utils/i18n';
import { t } from 'i18next';
import { ISignUpRequestBody } from '../data/request/ISignUpRequestBody';


const signUpValidation: Yup.Schema<ISignUpRequestBody> = Yup.object({
  username: Yup.string().max(255, `${t("maxCharachters_255")}`).min(5,`${t("minCharachters_5")}`).required(`${t('required')}`),
  firstName: Yup.string().max(255, `${t("maxCharachters_255")}`).min(3,`${t("minCharachters_3")}`).required(`${t('required')}`),
  lastName: Yup.string().max(255, `${t("maxCharachters_255")}`).min(3,`${t("minCharachters_3")}`).required(`${t('required')}`),
  email: Yup.string().email(`${t("invalidEmail")}`).required(`${t('required')}`),
  language: Yup.string().max(255, `${t("maxCharachters_255")}`).required(`${t('required')}`), 
  password: Yup.string().max(255, `${t("maxCharachters_255")}`).min(5,`${t("minCharachters_5")}`).required(`${t('required')}`),
});



export default signUpValidation;