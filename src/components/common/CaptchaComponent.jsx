import ReCAPTCHA from "react-google-recaptcha";

const CaptchaComponent = ({ siteKey, onChange }) => {
  return (
    <ReCAPTCHA
      sitekey={siteKey}
      onChange={onChange}
    />
  );
};

export default CaptchaComponent;
