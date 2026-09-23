import { createContext, useContext } from 'react';

/** Usuario de la sesion. Por ahora solo un nombre para mostrar en pantalla. */
export interface UserModel {
  usuario: string;
}

interface AuthContextValue {
  /** true mientras se comprueba si hay sesion. Hoy nunca tarda, pero la
   *  pantalla de carga ya esta lista para cuando el login sea real. */
  loading: boolean;
  isAuthenticated: boolean;
  user?: UserModel;
  login: (usuario: string, contrasena: string) => Promise<void>;
  logout: () => void;
}

/**
 * Contrato de la sesion.
 *
 * Esta es la pieza que el resto de la aplicacion consume: la cabecera para
 * mostrar el nombre, RequireAuth para bloquear rutas, el formulario para
 * entrar. Ninguno de ellos sabe de donde salen los datos, y esa es la idea:
 * el dia que el login pase a consultar una API de verdad, solo cambia el
 * proveedor y nada mas.
 */
export const AuthContext = createContext<AuthContextValue>({
  loading: false,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}
