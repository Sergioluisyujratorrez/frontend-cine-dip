import { RouteObject } from 'react-router-dom';
import { BrandedLayout } from './layouts/branded';
import { SignInPage } from './pages/signin-page';
import { SignUpPage } from './pages/signup-page';
/**
 * Rutas publicas de acceso, montadas en /auth/*.
 *
 * Por ahora solo esta el formulario de entrada. Registro y recuperacion de
 * contrasena se agregan aqui cuando toque armarlos.
 */
export const authRoutes: RouteObject[] = [
  {
    path: '',
    element: <BrandedLayout />,
    children: [
      {
        path: 'signin',
        element: <SignInPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
    ],
  },
];
