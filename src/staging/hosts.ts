let appHost = "epay-fe-dev.sefrone.dev";
switch (process.env.REACT_APP_TARGET_DEPLOY) {
    case "dev":
        appHost = "https://epay-fe-dev.sefrone.dev";
        break;
    case "edge":
        appHost = "https://epay-fe-edge.sefrone.dev";
        break;
    case "main":
        appHost = "https://www.epay.com";
        break;
    default:
        appHost = "https://www.epay.com";
        break;
}
const AppHost = appHost;
export { AppHost };
