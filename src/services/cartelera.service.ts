import { http } from "@/lib/http";
import { Funcion, Sala } from "@/types/cartelera";


// llamada a la api de cartelera
export const carteleraService = {

    // trae las funciones de de la pelicula
    async listarFunciones(idPelicula?: number): Promise<Funcion[]> {
        const {data} = await http.get<Funcion[]>('/cartelera/funciones', {
            params: {idPelicula}
        });
        return data;
    },

    //  trae las salas del cine
    async listarSalas(): Promise<Sala[]> {
        const {data} = await http.get<Sala[]>('/cartelera/saltas');
        return data;
    }
}