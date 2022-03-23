const ENVIROMENT = process.env.NODE_ENV;

export const config = {
  setBaseUrl: () => {
    let baseURL = `http://localhost:5000/`

    if (ENVIROMENT === 'production') baseURL = `https://wk3-outlet-backend.herokuapp.com/`

    return baseURL;
  },
};
