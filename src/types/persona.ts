
// post /persona (registro publico)
// Sin "rol" a proposito: el backend lo acepta del cuerpo y cualquiera
// podria crearse ADMIN. Si no se manda, aplica 3 (CLIENTE)
export interface RegistroPersona {
    nombres: string;
    apellidos: string;
    documento: string; // string aunque parezca numero
    telefono: string;  // igual que documento
    email: string;
    fechaNacimiento: string; // "1995-05-20"
    usuario: string;
    // Mal escrito en el backend. Si se manda "contrasena" responde 400
    // porque rechaza campos que no conoce (forbidNonWhitelisted)
    constrasena: string;
}

// El backend solo devuelve estos tres campos de la persona creada
export interface PersonaCreada {
    nombres: string;
    apellidos: string;
    telefono: string;
}

// Llega envuelta en {status, message, data}, a diferencia de cartelera
export interface RespuestaRegistro {
    status: string;
    message?: string;
    data: PersonaCreada;
}
