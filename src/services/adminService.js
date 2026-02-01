import api from "../api/axiosConfig";

const summary = () => api.get(`/admin/metrics/summary`);
const revenue = (from , to) => api.get(`/admin/metrics/revenue?from=${from}&to=${to}`);
const topProducts = (from , to , limit=5) =>
    api.get(`/admin/metrics/top-products?from=${from}&to=${to}&limit=${limit}`);

export default {summary,revenue,topProducts};