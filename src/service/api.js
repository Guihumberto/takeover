import axios from "axios";

const api = axios.create({
    baseURL: "https://legislacaoapi.sefaz.ma.gov.br/"
})

const api3 = axios.create({
    baseURL: "http://localhost:9200/"
})


export default api3