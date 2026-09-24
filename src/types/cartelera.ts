
export interface Funcion {
    idFuncion: number;
    idPelicula: number;
    pelicula: string;
    idSala: number;
    sala: string,
    tipoSala: string,
    fecha: string;
    horaInicio: string;
    horaFin: string;
    precio: number;
    estado: string;
}

export interface Sala {
    idSala: number;
    nombre: string;
    capacidad: number;
    tipo: string;
    activa: boolean;
}
 