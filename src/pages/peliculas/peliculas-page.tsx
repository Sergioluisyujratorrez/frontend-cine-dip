import { useEffect, useState } from 'react';
import { peliculaService } from '@/services/pelicula.service';
import { Pelicula } from '@/types/pelicula';
import { Container } from '@/components/common/container';
import { Link } from 'react-router-dom';

function formatearDuracion(minutos:number): string {
    const horas = Math.floor(minutos / 60);
    const resto = minutos % 60;
    return horas > 0 ? `${horas}h ${resto}m`  : `${resto}m`
}


export function PeliculasPage() {
    const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        peliculaService.listarPeliculas()
            .then((respuesta) => setPeliculas(respuesta.data))
            .catch((e: Error) => setError(e.message))
            .finally(() => setCargando(false));
    }, [])

    if (cargando) {
        return (
            <Container>
                <p>Cargando pelicula....</p>
            </Container>
        )
    }

    if (error) {
        return (
            <Container>
                <p>{error}</p>
            </Container>
        )
    }

    if (peliculas.length === 0) {
        return (
            <Container>
                <p>No hay peliculas en la cartelera</p>
            </Container>
        )
    }


    return (
        <Container>
            <div className='space-y-6 py-8'>

                <h1>Pelicula</h1>
                <div className='grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4'>
                    {peliculas.map((pelicula) => {
                        const poster = pelicula.imagenes[0];

                        return (
                            <article key={pelicula.id} className="group">

                                {/* Link para darle click */}
                                <Link to={`/peliculas/${pelicula.id}`}>
                                    {/* aspect-[2/3] es la proporcion de un afiche de cine */}
                                    <div className="overflow-hidden rounded-lg bg-muted aspect-[2/3]">
                                        {poster ? (
                                            <img src={peliculaService.urlImagen(poster)}
                                                alt={pelicula.titulo}
                                                // loading lazy: no descarga las imagenes de abajo
                                                // hasta que el usuario llegue a ellas
                                                loading="lazy"
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center p-4 text-center text-xs text-muted-foreground">
                                                Sin imagen
                                            </div>
                                        )}



                                    </div>

                                    <h2 className="mt-3 text-sm font-medium leading-tight text-mono">
                                        {pelicula.titulo}
                                    </h2>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {formatearDuracion(pelicula.duracionMinutos)}
                                    </p>
                                </Link>

                            </article>

                        )
                    })}


                </div>
            </div>
        </Container>
    );
}
