
export interface CrearPersona {
  nombres: string;
  apellidos: string;
  documento: string;
  telefono: string;
  email: string;
  fechaNacimiento: string;
  usuario: string;
  constrasena: string;
}

// respuesta
export interface PersonaCreada {
 status:string;
 message?:string;
 data: {
   nombres: string;
   apellidos: string;
   telefono: string;
  },
}