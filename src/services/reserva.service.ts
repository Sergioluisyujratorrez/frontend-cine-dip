import { http } from "@/lib/http";
import { CrearReserva, ReservaCreada } from "@/types/reserva";


export const reservaService = {

    async crear(reserva: CrearReserva) : Promise<ReservaCreada> {
        console.log('Enviendo reserva:', reserva);

        const {data} = await http.post<ReservaCreada>('/reservas', reserva);

        console.log('reserva creada', data);
        
        return data;

    },

    generarCodigo(idFuncion: number): string {
        // Fecha actual en base 36: un numero largo se vuelve texto corto
        const gestion = Date.now().toString(36).slice(-12);
        // Mayusculas: el backend las convierte igual, asi mostramos lo mismo que guarda
        return `RES-${idFuncion}-${gestion}`.toUpperCase();
           
    }
}