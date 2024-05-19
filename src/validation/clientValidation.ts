import * as Yup from 'yup';
import '../utils/i18n';
import { t } from 'i18next';


const clientValidation: Yup.Schema<any> = Yup.object({
  firstName: Yup.string().max(255, `${t("maxCharachters_255")}`).min(3, `${t("minCharachters_3")}`).required(`${t('required')}`),
  lastName: Yup.string().max(255, `${t("maxCharachters_255")}`).min(3, `${t("minCharachters_3")}`).required(`${t('required')}`),
  email: Yup.string().email(`${t("invalidEmail")}`).required(`${t('required')}`),
  address: Yup.string().max(255, `${t("maxCharachters_255")}`).min(10, `${t("minCharachters_10")}`).required(`${t('required')}`),
});



export default clientValidation;