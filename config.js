const config = {
  API_ENDPOINT:
    process.env.NODE_ENV == 'development' ? 'http://localhost:3000' : 'https://api.choz.io/',
};

export default config;
