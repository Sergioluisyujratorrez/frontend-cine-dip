import { AuthRouting } from '@/auth/auth-routing';
import { RequireAuth } from '@/auth/require-auth';
import { ErrorRouting } from '@/errors/error-routing';
import { Demo1Layout } from '@/layouts/demo1/layout';
import { PublicoLayout } from '@/layouts/publico/layout';
import { CarteleraPage } from '@/pages/cartelera/cartelera-page';
import { CineHomePage } from '@/pages/cine';
import { FuncionAsientosPage } from '@/pages/funciones/funciones-asientos-page';
import { PeliculasDellatePage } from '@/pages/peliculas/peliculas-detalle-page';

import { PeliculasPage } from '@/pages/peliculas/peliculas-page';
import { Navigate, Route, Routes } from 'react-router';


export function AppRoutingSetup() {
  return (
    <Routes>
     {/* PUBLICO */}
     
        <Route element={<PublicoLayout />}>
          <Route path="/peliculas" element={<PeliculasPage />} />
          <Route path="/peliculas/:id" element={<PeliculasDellatePage />} />
          <Route path="/funciones/:id" element={<FuncionAsientosPage />} />
        </Route>
     



      {/* PRIVADO */}
      <Route element={<RequireAuth />}>
        <Route element={<Demo1Layout />}>
          <Route path="/" element={<CineHomePage />} />
          <Route path="/cartelera" element={<CarteleraPage />} />
          
        </Route>
      </Route>

      <Route path="error/*" element={<ErrorRouting />} />
      <Route path="auth/*" element={<AuthRouting />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
}
