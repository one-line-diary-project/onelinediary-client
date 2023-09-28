const getGoogleUrl = (from) => {
  const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;

  const options = {
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_GOOGLE_REDIRECT,
    response_type: "code",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
};

export default getGoogleUrl;
