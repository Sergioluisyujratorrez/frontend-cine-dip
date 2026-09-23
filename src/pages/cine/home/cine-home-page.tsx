import { useAuth } from '@/auth/context/auth-context';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Container } from '@/components/common/container';

/**
 * Pantalla de inicio.
 *
 * De momento solo saluda y deja anotadas las secciones que vienen. Todavia
 * no consulta ningun dato: la plantilla esta sin conectar a proposito.
 */
export function CineHomePage() {
  const { user } = useAuth();

  const secciones = [
    {
      titulo: 'Cartelera',
      detalle: 'Funciones disponibles por pelicula, sala y horario',
    },
    {
      titulo: 'Peliculas',
      detalle: 'Catalogo con sus imagenes',
    },
    {
      titulo: 'Reservas',
      detalle: 'Seleccion de asientos y registro de la reserva',
    },
  ];

  return (
    <Container>
      <div className="space-y-6 py-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Hola, {user?.usuario ?? 'invitado'}
          </h1>
          <p className="text-sm text-muted-foreground">
            Plantilla lista. Las secciones de abajo todavia no estan armadas.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {secciones.map((seccion) => (
            <Card key={seccion.titulo}>
              <CardHeader>
                <CardTitle>{seccion.titulo}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {seccion.detalle}
                </p>
                <p className="text-xs text-muted-foreground">Pendiente</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}
