import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth", withCredentials: true
})

export async function register(username, email, password, bio) {
    try {
        const response = await api.post("/register", {
            username, email, password, bio
        })
        return response.data;
    } catch (error) {
        throw error;
    }
}
export async function login(username, password) {
    try {
        const response = await api.post("/login", {
            identifier: username, password
        })
        return response.data;
    } catch (error) {
        throw error;
    }
}
export async function getMe() {
    try {
        const response = await api.get("/get-me");
        return response.data;
    } catch (error) {
        throw error;
    }
}