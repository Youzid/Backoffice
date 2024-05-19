let TargetReCaptchaSiteKey = "";

switch (process.env.REACT_APP_TARGET_API) {
    case "local":
        TargetReCaptchaSiteKey = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
        break;
    case "localdev":
        TargetReCaptchaSiteKey = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
        break;
    case "dev":
        TargetReCaptchaSiteKey = "6LcNt94oAAAAAG88TqoQglBDHWxG3rc1W265AeGh";
        break;
    case "edge":
        TargetReCaptchaSiteKey = "6Lfd29soAAAAAIDEer-nx8TE58_Gfocjj2XRWSfS";
        break;
    case "epay":
        TargetReCaptchaSiteKey = "6LdlnAwpAAAAACcNCrUSGk0wKyKXiRh2dcJmgXSO";
        break;
    default:
        TargetReCaptchaSiteKey = "6Lfd29soAAAAAIDEer-nx8TE58_Gfocjj2XRWSfS";
        break;
}

const ReCaptchaSiteKey = TargetReCaptchaSiteKey;

export { ReCaptchaSiteKey };
