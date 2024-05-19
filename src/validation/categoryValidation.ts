import * as Yup from 'yup';
import '../utils/i18n';
import { t } from 'i18next';
import { ICategoryRequestBody } from '../data/request/ICategoryRequestBody';


const categoryValidation: Yup.Schema<ICategoryRequestBody> = Yup.object({
  name: Yup.string().max(255, `${t("maxCharachters_255")}`).min(3, `${t("minCharachters_3")}`).required(`${t('required')}`),
  type: Yup.string().max(255, `${t("maxCharachters_255")}`).min(3, `${t("minCharachters_3")}`).required(`${t('required')}`),
  description: Yup.string().max(255, `${t("maxCharachters_255")}`).min(3, `${t("minCharachters_3")}`).required(`${t('required')}`),
});

export default categoryValidation;