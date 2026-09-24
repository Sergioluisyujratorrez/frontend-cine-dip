// parte de la vista

import {useState, useEffect} from 'react';
import { Funcion } from '@/types/cartelera';
import { carteleraService } from '@/services/cartelera.service';
import { Container } from '@/components/common/container';


export const CarteleraPage = () => {
  
  const [funciones, setFunciones] = useState<Funcion[]>([]);
  
  useEffect(() =>{
    carteleraService.listarFunciones()
    .then(setFunciones)
  })
  
  return (
    <Container>
      <div className="space-y-6 py-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Cartelera</h1>
          <p className="text-sm text-muted-foreground">
           
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {funciones.map((funcion) =>(
            
            <article key={funcion.idFuncion} className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-medium text-mono">{funcion.pelicula}</h2>
              <p className="mt-1 text-sm text-muted-foreground"> </p>
              <p className="mt-3 text-sm">
                {funcion.fecha}
              </p>
              <p className="mt-3 text-lg font-semibold text-mono">
               {funcion.precio}
              </p>
            </article>
          ))}
        </div>
      </div>
    </Container>
  )
}
