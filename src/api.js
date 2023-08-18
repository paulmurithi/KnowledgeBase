import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api', 
});

export default {
  register(data) {
    return apiClient.post('/register', data);
  },
  login(data) {
    return apiClient.post('/login', data);
  },
};
