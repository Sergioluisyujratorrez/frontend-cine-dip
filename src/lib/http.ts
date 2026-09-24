import axios from 'axios';
import { env } from "@/config/env";

// cliente http 

export const http = axios.create({
    // axios va http://localhost:3000/api/v1/peliculas
    baseURL: env.apiUrl,
    timeout:  10000, // 10 seg
});

http.interceptors.response.use(
    // si sale bien
    (respuesta) => respuesta,
    // si sale mal
    (error) => {
         // backend responde {status, message, timestamp}
        const mensaje = error.response?.data?.message ?? 'No se puede conectar con el servidor';
        return Promise.reject(new Error(mensaje));
    },
)
