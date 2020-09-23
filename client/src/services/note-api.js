import axios from 'axios';

export const fetchNotebookService = () => axios.get('/api/notebook');
export const fetchPaginatedNotebookService = page => axios.get(`/api/notebook/paginated?page=${page}`);
export const fetchNoteService = id => axios.get(`/api/notebook/${id}`);
export const createNoteService = formData => axios.post(`/api/notebook`, {...formData});
export const updateNoteService = formData => axios.put(`/api/notebook/${formData.id}`, {...formData});
export const deleteNoteService = id => axios.delete(`/api/notebook/${id}`);
