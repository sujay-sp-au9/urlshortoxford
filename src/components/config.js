const appId = process.env.REACT_APP_appId;
const tid = process.env.REACT_APP_tid;
const config = {
  appId,
  redirectUri: window.location.href.split("glamurlshortenerapplication")[0],
  scopes: ["user.read"],
  authority: `https://login.microsoftonline.com/${tid}`,
};
export default config;
