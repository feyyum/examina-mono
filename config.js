const config = {
  API_ENDPOINT:
    process.env.NODE_ENV == 'development' ? 'http://localhost:3005' : 'https://api.choz.io/',
};

export default config;
