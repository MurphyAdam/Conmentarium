import axios from 'axios';

export const fetchUser = id => axios.get(`/api/users/${id}`);
export const fetchCurrentUser = userId => axios(`/api/auth/current_user/${userId}`);
export const createUser = formData => axios.post(`/api/auth/signup`, {...formData});
export const login = formData => axios.post(`/api/auth/signin`, {...formData});
export const logoutCurrentUser = () => axios(`/api/auth/logout`);
