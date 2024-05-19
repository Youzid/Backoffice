let TargetBaseUrl = "";

switch (process.env.REACT_APP_TARGET_DEPLOY) {
    case "local":
        TargetBaseUrl = "https://localhost:7277/api/v1";
        break;
    case "dev":
        TargetBaseUrl = "https://backoffice/api/v1";
        break;
}

const BASE_URL = TargetBaseUrl;

export { BASE_URL };

const endpoints = {

    AUTH_LOGIN_ENDPOINT: BASE_URL + "/auth/login",
    AUTH_REGISTER_ENDPOINT: BASE_URL + "/auth/client/register",
    AUTH_CREATE_USER_WITH_TOKEN_ENDPOINT: BASE_URL + "/auth/createUser/",
    AUTH_RECOVER_PASSWORD_ENDPOINT: BASE_URL + "/auth/passwordRecovery/",
    AUTH_UPDATE_BY_ID_PERMISSIONS_WITH_TOKEN__ENDPOINT: BASE_URL + "/auth/permissions/",
    AUTH_LOGOUT_ENDPOINT: BASE_URL + "/auth/logout/",
    AUTH_ACCOUNT_CONFIRMATION: BASE_URL + "/auth/client/activate/",
    AUTH_NEW_PASSWORD: BASE_URL + "/auth/resetPassword/",

    EMAIL_INVOICE_ENDPOINT: BASE_URL + "/invoices/sendEmail/",

    ACCOUNT_GET_ENDPOINT: BASE_URL + "/accounts/",

    STATISTIC_GET_PAYMENTS_COUNT_ENDPOINT: BASE_URL + "/stats/general",
    STATISTIC_GET_MONTHLY_INCOME_ENDPOINT: BASE_URL + "/stats/monthlyIncomeStats",
    STATISTIC_GET_YEARLY_INCOME_ENDPOINT: BASE_URL + "/stats/yearlyIncomeStats/",
    STATISTIC_GET_STATUS_COUNT_ENDPOINT: BASE_URL + "/stats/invoiceStatusStats/",

    CLIENTS_GET_LIST_ENDPOINT: BASE_URL + "/clients/list",
    CLIENTS_GET_DOCUMENTS_LIST_ENDPOINT: BASE_URL + "/clients/doc/list",
    CLIENTS_CREATE_ENDPOINT: BASE_URL + "/clients/add",
    CLIENTS_DOCUMENT_CREATE_ENDPOINT: BASE_URL + "/clients/batch",
    CLIENTS_DELETE_BY_ID_ENDPOINT: BASE_URL + "/clients/delete/",
    CLIENTS_DOCUMENTS_DELETE_BY_ID_ENDPOINT: BASE_URL + "/clients/delete/doc/",
    CLIENTS_ACTIVATE_BY_ID_ENDPOINT: BASE_URL + "/clients/status/",

    USERS_CREATE_ENDPOINT: BASE_URL + "/user/createUser",
    USERS_GET_PERMISSIONS_BY_USERNAME_ENDPOINT: BASE_URL + "/user/permissions/",
    USERS_UPDATE_PERMISSIONS_WITH_USERNAME_ENDPOINT: BASE_URL + "/user/permissions",
    USERS_GET_OWN_INFO_ENDPOINT: BASE_URL + "/clients/info",
    USERS_GET_USERS_LIST_WITHOUT_CURRENT_USER: BASE_URL + "/user/listWithoutCurrentUser",
    USERS_ACTIVATE_BY_ID_ENDPOINT: BASE_URL + "/user/activate/",
    USERS_DEACTIVATE_BY_ID_ENDPOINT: BASE_URL + "/user/deactivate/",
    USERS_UPDATE_OWN_ENDPOINT: BASE_URL + "/clients/update",
    USERS_UPDATE_BY_ID_ENDPOINT: BASE_URL + "/user/update/",

    CATEGORY_GET_LIST_ENDPOINT: BASE_URL + "/locationCategories/list",
    CATEGORY_CREATE_ENDPOINT: BASE_URL + "/locationCategories/create",
    CATEGORY_UPDATE_BY_ID_ENDPOINT: BASE_URL + "/locationCategories/update/",
    CATEGORY_DELETE_BY_ID_ENDPOINT: BASE_URL + "/locationCategories/delete/",

    FILES_DODWNLOAD_ENDPOINT: BASE_URL + "/files/",


    LOCATIONS_GET_LIST_ENDPOINT: BASE_URL + "/locations/list",
    LOCATIONS_GET_DETAILS_BY_ID_ENDPOINT: BASE_URL + "/locations/location/",
    LOCATIONS_CREATE_ENDPOINT: BASE_URL + "/locations/create",
    LOCATIONS_UPDATE_BY_ID_ENDPOINT: BASE_URL + "/locations/update/",
    LOCATIONS_IMAGES_CREATE_ENDPOINT: BASE_URL + "/locations/images/create",
    LOCATIONS_IMAGES_UPDATE_ENDPOINT: BASE_URL + "/locations/images/update",
    LOCATIONS_DELETE_BY_ID_ENDPOINT: BASE_URL + "/locations/delete/",
    LOCATIONS_VALIDATE_ENDPOINT: BASE_URL + "/locations/validate/",
    LOCATIONS_INVALIDATE_ENDPOINT: BASE_URL + "/locations/invalidate/",
    LOCATIONS_REVIEW_GET_LIST_ENDPOINT: BASE_URL + "/locationReviews/list",
    LOCATIONS_REVIEW_DELETE_BY_ID_ENDPOINT: BASE_URL + "/locationReviews/delete/",

};

export default endpoints;
