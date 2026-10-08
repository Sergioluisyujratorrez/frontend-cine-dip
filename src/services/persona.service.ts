import { http } from "@/lib/http";
import { CrearPersona, PersonaCreada } from "@/types/persona";



// llamada a la api de cartelera
export const personaService = {

    // trae las funciones de de la pelicula
    async registrar(persona: CrearPersona): Promise<PersonaCreada> {
        // console.log("registrando:", persona);
        const {data} = await http.post<PersonaCreada>('/persona', persona);
        // console.log("respuesta del registro", data);
        return data;
    },

  
}