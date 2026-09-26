import { env } from "@/config/env";
import { http } from "@/lib/http";
import { Pelicula, RespuestaPaginada } from "@/types/pelicula";

export const peliculaService = {
    async listarPeliculas(
         pagina = 1,
         porPagina = 20,
        ): Promise<RespuestaPaginada<Pelicula>  > {
        const {data} = await http.get<RespuestaPaginada<Pelicula>>('/peliculas' , {
            params: {pagina, porPagina}
          });
        return data;
    },

    // detalles de pelicula
    async obtenerPelicula(id:number): Promise<Pelicula | undefined> {
        const respuesta = await this.listarPeliculas(1, 100);
        return respuesta.data.find((p) => p.id === id)
    },

    // url para porter 
    urlImagen(nombreArchivo : string) : string {
        return `${env.apiUrl}/files/pelicula/${nombreArchivo}` 
    }

}