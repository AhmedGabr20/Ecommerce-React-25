import api from "../api/axiosConfig";

const ENDPOINT = "/admin/file";

const upload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await api.post(
        `${ENDPOINT}/upload`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return res;
};

export default {
    upload
};