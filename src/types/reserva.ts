
export type EstadoReserva = 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA';

// post /reservas (requiere token de CLIENTE)
// Lo que se envia

// Un asiento dentro de la reserva
export interface DetalleReserva {
    idAsiento: number;
    precio: number;
}

export interface CrearReserva {
    // Sale del token (user.id): en el backend el cliente usa el mismo id
    // que la persona. Nunca de un input, o se podria reservar a nombre de otro
    idCliente: number;
    idFuncion: number;
    fechaReserva: string; // ISO: new Date().toISOString()
    // Al enviar se llama codigoReserva; al responder viene como "codigo"
    codigoReserva: string;
    estado: EstadoReserva;
    // El backend acepta el total que le mandemos: se calcula siempre
    // con funcion.precio, nunca de algo que el usuario pueda tocar
    total: number;
    detalles: DetalleReserva[];
}

// Lo que responde: lo mismo que se guardo, ya con su id

export interface ReservaRespuesta {
    id: number;
    idCliente: number;
    idFuncion: number;
    fechaReserva: string;
    codigo: string; // aqui ya no se llama codigoReserva
    estado: EstadoReserva;
    total: number;
}

export interface DetalleRespuesta {
    id: number;
    idReserva: number;
    idAsiento: number;
    precio: number;
}

// Viene anidada: el codigo esta en data.reserva.codigo, no en data.codigo
// POST /reservas
export interface ReservaCreada{
    status: string;
    message?: string;
    data: {
        reserva: ReservaRespuesta;
        detalles: DetalleRespuesta[];
    };
}
