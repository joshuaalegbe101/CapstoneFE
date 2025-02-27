import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const registerUser = (userData) => axios.post(`${API_URL}/auth/register`, userData);
export const loginUser = (userData) => axios.post(`${API_URL}/auth/login`, userData);
export const fetchTransactions = (token) => axios.get(`${API_URL}/transactions`, { headers: { Authorization: `Bearer ${token}` } });
export const fetchBudgets = (token) => axios.get(`${API_URL}/budgets`, { headers: { Authorization: `Bearer ${token}` } });
export const createTransaction = (token, data) => axios.post(`${API_URL}/transactions`, data, { headers: { Authorization: `Bearer ${token}` } });
export const createBudget = (token, data) => axios.post(`${API_URL}/budgets`, data, {headers: { Authorization: `Bearer ${token}` },});
export const updateTransaction = (token, id, data) => axios.put(`${API_URL}/transactions/${id}`, data, {headers: { Authorization: `Bearer ${token}` }});
export const deleteTransaction = (token, id) => axios.delete(`${API_URL}/transactions/${id}`, {headers: { Authorization: `Bearer ${token}` }});
export const deleteBudget = (token, id) => axios.delete(`${API_URL}/budgets/${id}`, { headers: { Authorization: `Bearer ${token}` },});