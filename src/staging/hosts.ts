let appHost = "backoffice-dev.dev";
switch (process.env.REACT_APP_TARGET_DEPLOY) {
    case "dev":
        appHost = "https://backoffice-dev.dev";
        break;
    case "edge":
        appHost = "https://backoffice-edge.dev";
        break;
    case "main":
        appHost = "https://www.backoffice.com";
        break;
    default:
        appHost = "https://www.backoffice.com";
        break;
}
const AppHost = appHost;
export { AppHost };
