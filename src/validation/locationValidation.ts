import * as Yup from 'yup';
import '../utils/i18n';
import { t } from 'i18next';
import { ILocationRequestBody } from '../data/request/ILocationRequestBody';

const locationValidation:Yup.Schema<ILocationRequestBody> =  Yup.object({

  categoryId: Yup.string().max(255, `${t("maxCharachters_255")}`).min(3,`${t("minCharachters_3")}`).required(`${t('required')}`),
  nameAr: Yup.string().max(255, `${t("maxCharachters_255")}`).min(3,`${t("minCharachters_3")}`).required(`${t('required')}`),
  nameFr: Yup.string().max(255, `${t("maxCharachters_255")}`).min(3,`${t("minCharachters_3")}`).required(`${t('required')}`),
  nameEn: Yup.string().max(255, `${t("maxCharachters_255")}`).min(3,`${t("minCharachters_3")}`).required(`${t('required')}`),
  descriptionAr: Yup.string().max(500, `${t("maxCharachters_500")}`).min(3,`${t("minCharachters_3")}`),
  descriptionFr: Yup.string().max(500, `${t("maxCharachters_500")}`).min(3,`${t("minCharachters_3")}`),
  descriptionEn: Yup.string().max(500, `${t("maxCharachters_500")}`).min(3,`${t("minCharachters_3")}`),
  latitude: Yup.string().max(510, `${t("maxCharachters_255")}`).min(3,`${t("minCharachters_3")}`).required(`${t('required')}`),
  longitude: Yup.string().max(255, `${t("maxCharachters_255")}`).min(3,`${t("minCharachters_3")}`).required(`${t('required')}`),
  address: Yup.string().max(255, `${t("maxCharachters_255")}`).min(3,`${t("minCharachters_3")}`).required(`${t('required')}`),
  addressAr: Yup.string().max(255, `${t("maxCharachters_255")}`).min(3,`${t("minCharachters_3")}`).required(`${t('required')}`)
});

export default locationValidation;