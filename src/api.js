import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export default {
  register(data) {
    return apiClient.post('/register', data);
  },
  login(data) {
    return apiClient.post('/login', data);
  },
};
