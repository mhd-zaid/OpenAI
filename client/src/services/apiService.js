const API_URL_BASE = import.meta.env.VITE_BACKEND_URL;
const defaultHeaders = {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: null,
};

export const apiService = {

    getAll(instance, params){
        let url = `${API_URL_BASE}/${instance}?${params}`;
        return fetch(url, { ...defaultHeaders })
            .then((response) => response);
    },

    getOne(instance, id){
        return fetch(`${API_URL_BASE}/${instance}/${id}`, { ...defaultHeaders })
            .then((response) => response);
    },

    create(instance, data){
        defaultHeaders.method = "POST";
        defaultHeaders.body = JSON.stringify(data);
        return fetch(`${API_URL_BASE}/${instance}`, { ...defaultHeaders })
            .then((response) => response);
    },

    update(instance, id, data){
        defaultHeaders.method = "PUT";
        defaultHeaders.body = JSON.stringify(data);
        return fetch(`${API_URL_BASE}/${instance}/${id}`, { ...defaultHeaders })
            .then((response) => response);
    },

    deleteById(instance, id){
        defaultHeaders.method = "DELETE";
        return fetch(`${API_URL_BASE}/${instance}/${id}`, { ...defaultHeaders })
            .then((response) => response);
    }
}