import api from "../api/axiosConfig";

const list = ({ q, categoryId, active, page=0, size=10, sortBy="id", dir="desc" }) => {
    const params = new URLSearchParams();
    if (q) params.append("q", q);
    if (categoryId) params.append("categoryId", categoryId);
    if (active !== undefined && active !== null) params.append("active", active);
    params.append("page", page);
    params.append("size", size);
    params.append("sortBy", sortBy);
    params.append("dir", dir);
    return api.get(`/admin/products?${params.toString()}`);
};

const create = (body) => api.post("/admin/products", body);
const update = (id, body) => api.put(`/admin/products/${id}`, body);
const remove = (id) => api.delete(`/admin/products/${id}`);

const categories = () => api.get("/categories");

export default { list, create, update, remove, categories };
