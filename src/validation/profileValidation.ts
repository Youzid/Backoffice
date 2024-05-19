import * as Yup from 'yup';
import '../utils/i18n';

const profileValidation = (t: (key: string) => string) => Yup.object({
  username: Yup.string().max(255, `${t('invalidEmail')}`).min(3, `${t('minCharachters_3')}`).required(`${t('required')}`),
  firstName: Yup.string().max(255, `${t('invalidEmail')}`).min(3, `${t('minCharachters_3')}`).required(`${t('required')}`),
  lastName: Yup.string().max(255, `${t('maxCharachters_255')}`).min(3, `${t('minCharachters_3')}`).required(`${t('required')}`),
  email: Yup.string().email(`${t('invalidEmail')}`).required(`${t('required')}`),
  language: Yup.string().required(`${t('required')}`),
});



export default profileValidation;