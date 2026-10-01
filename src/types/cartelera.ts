
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

// espera
export interface Sala {
    idSala: number;
    nombre: string;
    capacidad: number;
    tipo: string;
    activa: boolean;
}
 
//  Asiento

export interface Asiento {
    idAsiento: number;
    idSala: number;
    sala: string;
    fila: string; // A,B,C
    numero: number;
    asiento: string; // A1
    tipo: string; // NORMAL, VIP, etc.
    activo: boolean;
    disponible: boolean;
}