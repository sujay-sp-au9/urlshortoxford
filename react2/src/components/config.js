const appId = process.env.REACT_APP_appId;
const config = {
  appId,
  redirectUri: "https://shorturl.cloudmantra.in",
  scopes: ["user.read"],
  authority: "https://login.microsoftonline.com/common",
};
export default config;
