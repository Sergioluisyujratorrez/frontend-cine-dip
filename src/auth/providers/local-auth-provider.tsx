import { PropsWithChildren, useCallback, useState } from 'react';
import { AuthContext, UserModel } from '@/auth/context/auth-context';

/**
 * Proveedor de sesion LOCAL, de practica.
 *
 * No habla con ningun servidor: compara contra un usuario escrito aqui abajo.
 * Sirve para ver funcionando el formulario, las rutas protegidas y el cerrar
 * sesion sin depender todavia de una API.
 *
 * Es temporal a proposito. Cuando toque conectar el backend, lo unico que
 * cambia es el contenido de `login`: en vez de comparar con USUARIO_DEMO,
 * hara una peticion y guardara lo que responda. El resto de la aplicacion
 * (RequireAuth, la cabecera, el menu) no se entera del cambio.
 */

const USUARIO_DEMO = {
  usuario: 'demo',
  contrasena: 'demo123',
};

export function AuthProvider({ children }: PropsWithChildren) {
  const [loading] = useState(false);
  const [user, setUser] = useState<UserModel | undefined>();

  const login = useCallback(async (usuario: string, contrasena: string) => {
    const coincide =
      usuario === USUARIO_DEMO.usuario &&
      contrasena === USUARIO_DEMO.contrasena;

    if (!coincide) {
      throw new Error('Usuario o contrasena incorrectos.');
    }

    setUser({ usuario });
  }, []);

  const logout = useCallback(() => {
    setUser(undefined);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        isAuthenticated: user !== undefined,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
