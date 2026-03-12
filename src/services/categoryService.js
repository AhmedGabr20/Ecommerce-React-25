import api from "../api/axiosConfig";

const CATEGORY_URL = "/categories";

const getAll = async (page = 0, size = 20, sortBy = "id") => {
    // backend returns ApiResponse with data = list
    const res = await api.get(`${CATEGORY_URL}?page=${page}&size=${size}&sortBy=${sortBy}`);
    return res;
};

const create = async (productPayload) => {
    return await api.post(`${CATEGORY_URL}`, productPayload);
};

export default {
    getAll,
    create,
};
