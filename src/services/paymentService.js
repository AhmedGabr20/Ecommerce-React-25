import api from "../api/axiosConfig";

const PAY = "/payments";

const pay = (orderId,method = "CASH") =>
    api.post(`${PAY}/${orderId}?method=${method}`);



export default {pay}