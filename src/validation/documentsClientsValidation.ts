import { t } from 'i18next';
import * as Yup from 'yup';
import { IDocClientsRequesBody } from '../data/request/IClientsRequestBody';

const documentsClientsValidation:Yup.Schema<IDocClientsRequesBody> =  Yup.object({
  description: Yup.string().max(255, `${t("maxCharachters_255")}`).min(5,`${t("minCharachters_5")}`).required(`${t('required')}`),
  File: Yup.string().required(`${t('required')}`).nullable(),
});



export default documentsClientsValidation;