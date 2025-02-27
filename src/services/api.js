import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const registerUser = (userData) => axios.post(`${API_URL}/auth/register`, userData);
export const loginUser = (userData) => axios.post(`${API_URL}/auth/login`, userData);
export const fetchTransactions = (token) => axios.get(`${API_URL}/transactions`, { headers: { Authorization: `Bearer ${token}` } });
export const fetchBudgets = (token) => axios.get(`${API_URL}/budgets`, { headers: { Authorization: `Bearer ${token}` } });
export const createTransaction = (token, data) => axios.post(`${API_URL}/transactions`, data, { headers: { Authorization: `Bearer ${token}` } });
export const createBudgets = (token) => axios.post(`${API_URL}/transactions`, {headers: { Authorization: `Bearer ${token}` } });