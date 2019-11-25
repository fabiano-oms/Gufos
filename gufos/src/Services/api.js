import Axios from 'axios';

const api = Axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer " + localStorage.getItem("usuario-gufos")
        //TEM QUE TER UM ESPAÇO DPS DE BEARER = "Bearer "
    }
});

export default api;