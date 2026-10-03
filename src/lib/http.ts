import axios from 'axios';
import { env } from "@/config/env";
import { authService } from '@/services/auth.service';

// cliente http 

export const http = axios.create({
    // axios va http://localhost:3000/api/v1/peliculas
    baseURL: env.apiUrl,
    timeout:  10000, // 10 seg
});



// request: corre ANTES de que salga la peticion, por eso aqui se pega el token
http.interceptors.request.use((config) => {
    const token = authService.obtenerToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})



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



