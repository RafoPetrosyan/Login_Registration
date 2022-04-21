import axios from 'axios';

const client = axios.create({
  baseURL: 'https://dev.mapllo.com/api/',
});

client.interceptors.request.use((config) => {
    
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      config.headers['x-authorization'] = accessToken
    }
    return config
});

client.interceptors.response.use(
    
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
          console.log('error 401');
      }
      if (error.response && error.response.data && error.response.status !== 401) {
          console.log('!401');
      }
      return Promise.reject(error)
    }
);

export default client;







