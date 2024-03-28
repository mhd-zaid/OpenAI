const API_URL_BASE = import.meta.env.VITE_BACKEND_URL;

export const apiService = {

    getAll(instance, params){
        const headers = new Headers({ "Content-Type": "application/json" });
        let url = params.includes("/") ? `${API_URL_BASE}/${instance}${params}`:  `${API_URL_BASE}/${instance}?${params}`;
        return fetch(url, { method: "GET", headers })
            .then((response) => response.json());
    },

    getOne(instance, id){
        const headers = new Headers({ "Content-Type": "application/json" });
        return fetch(`${API_URL_BASE}/${instance}/${id}`, { method: "GET", headers })
            .then((response) => response.json());
    },

    create(instance, data){
        const headers = new Headers({ "Content-Type": "application/json" });
        const token = localStorage.getItem("token");
        if (token) {
            headers.append("Authorization", `Bearer ${token}`);
        }
        return fetch(`${API_URL_BASE}/${instance}`, { method: "POST", headers, body: JSON.stringify(data), credentials: 'include' })
            .then((response) => response.json());
    },

    update(instance, id, data){
        const headers = new Headers({ "Content-Type": "application/json" });
        return fetch(`${API_URL_BASE}/${instance}/${id}`, { method: "PUT", headers, body: JSON.stringify(data) })
            .then((response) => response.json());
    },

    deleteById(instance, id){
        const headers = new Headers({ "Content-Type": "application/json" });
        return fetch(`${API_URL_BASE}/${instance}/${id}`, { method: "DELETE", headers })
            .then((response) => response.json());
    }
}