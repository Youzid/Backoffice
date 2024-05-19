import { t } from 'i18next';
import * as Yup from 'yup';

const resetPasswordValidation = () => Yup.object({
    password: Yup.string().max(255, `${t('maxCharachters_255')}`).min(5, `${t('minCharachters_5')}`).required(`${t('required')}`),
    confirmPassword: Yup.string()
        .required(`${t('required')}`)
        .test('passwords-match', `${t('passwordMatchmErr')}`, function (value) {
            if (this.parent.password && value !== this.parent.password) {
                return false;
            }
            if (!this.parent.password && value) {
                return false;
            }
            return true;
        }),
});

export default resetPasswordValidation;
