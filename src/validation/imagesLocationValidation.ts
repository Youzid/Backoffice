import { t } from 'i18next';
import * as Yup from 'yup';

const imagesLocationValidation:Yup.Schema<any> =  Yup.object({
  Files: Yup.array().of(Yup.string().nullable()).test(
    'hasEmptyFiles',
    `${t("oneImageAtLeast")}`,
    (files:any) => {
      return files.some((file:any) => file === null || (file && file.trim() !== ''));
    }
  ),
});

export default imagesLocationValidation;