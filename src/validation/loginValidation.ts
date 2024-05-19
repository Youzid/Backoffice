import * as Yup from 'yup';
import '../utils/i18n';
import { t } from 'i18next';

const loginValidation = Yup.object({
  pseudo: Yup.string().max(255, `${t("maxCharachters_255")}`).min(5, `${t("minCharachters_5")}`).required(`${t('required')}`),
  password: Yup.string().max(255, `${t("maxCharachters_255")}`).min(5, `${t("minCharachters_5")}`).required(`${t('required')}`)
});

export default loginValidation;