import axios from 'axios';

export const fetchNotebook = () => axios.get('/api/notebook');
export const fetchPaginatedNotebook = page => axios.get(`/api/notebook/paginated?page=${page}`);
export const fetchNote = id => axios.get(`/api/notebook/${id}`);
export const createNote = formData => axios.post(`/api/notebook`, {...formData});
export const updateNote = formData => axios.put(`/api/notebook/${formData.id}`, {...formData});
export const deleteNote = id => axios.delete(`/api/notebook/${id}`);
