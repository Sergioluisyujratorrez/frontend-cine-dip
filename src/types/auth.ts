
export interface Credenciales {
    usuario: string;
    contrasena: string;
}

export interface RespuestaLogin {
  status: string;
  message?: string;
  data: { 
    token: string
  };
}

export interface PayloadToken {
        id: number;
        usuario: string;
        roles:string[];
        iat: number;
        exp: number;
}

// no viene de ningun lado 
export interface UsuarioSesion {
    id: number;
    usuario: string;
    roles: string[];
}