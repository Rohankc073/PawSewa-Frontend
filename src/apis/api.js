import axios from 'axios';

const BASE_URL = 'http://localhost:5005/auth';

export const loginUser = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/login`, credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${BASE_URL}/register`, userData);
  return response.data;

};



//Api folder
//Make it nice 


