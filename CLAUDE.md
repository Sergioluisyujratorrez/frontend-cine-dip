# Frontend del cine

Aplicación React que consume la API REST de `api-cine-dip` (NestJS), un backend
**desarrollado por otra persona**. Este proyecto es solo el frontend.

Construido sobre la plantilla comercial **Metronic v9.2.0** (React 19 +
TypeScript + Tailwind 4 + Radix UI), limpiada de 957 a ~130 archivos: se
eliminaron 9 layouts demo, todas las páginas de ejemplo, Supabase y la fuente
de iconos keenicons.

---

## Reglas de trabajo

- **No modificar el backend.** Si algo falla ahí, se señala y se sugiere, pero
  el código de `api-cine-dip` no se toca.
- **Comentarios cortos en el código**, explicando el *por qué*, no el *qué*.
- **Puntos de verificación con `console.log('>>> ...')`** mientras se construye.
  Son temporales: se borran al cerrar cada paso (buscar `>>>`).
- **Nunca programar a ciegas**: antes de escribir un tipo, mirar la respuesta
  real del endpoint o el DTO del backend.

---

## Arranque

```powershell
# Backend (en D:\eliminar\api-cine-dip)
npm run start:prod          # corre dist/main, requiere npm run build tras editar

# Frontend
npm run dev
npm run typecheck           # tsc -b --force
```

El `.env` tiene una sola variable:

```
VITE_CINE_API_URL=http://localhost:3000/api/v1
```

---

## Arquitectura en capas

Cada capa solo habla con la de abajo. **Las pantallas nunca llaman a axios ni
escriben URLs.**

```
pantalla  →  servicio  →  lib/http  →  config/env  →  .env
```

| Archivo | Responsabilidad |
|---|---|
| `src/config/env.ts` | Único lugar que toca `import.meta.env` |
| `src/lib/http.ts` | Cliente axios. **Único archivo con `fetch`/axios** |
| `src/lib/jwt.ts` | Decodifica el JWT (no valida firma, eso es del backend) |
| `src/types/*.ts` | Forma de los datos de cada módulo |
| `src/services/*.service.ts` | Las rutas y llamadas de cada recurso |
| `src/pages/**` | Pantallas. Solo piden datos y los pintan |

### Convención de nombres

- Archivos en `kebab-case`: `cartelera-page.tsx`
- Tipos sin sufijo (`types/cartelera.ts`), servicios con sufijo
  (`services/cartelera.service.ts`)
- Componentes en `PascalCase` (lo exige React)

### Los dos interceptores de `http.ts`

```ts
request   → adjunta Authorization: Bearer a TODAS las peticiones
            (las públicas lo ignoran; así no hay lista que mantener)

response  → extrae el message del backend y, si llega 401 fuera del login,
            borra el token (sesión vencida)
```

---

## Autenticación

- Login contra `POST /auth/login`, token en `localStorage` bajo `cine_token`
- El token dura **2 horas** y lleva `{ id, usuario, roles[] }`
- La sesión se restaura al recargar (`useEffect` en el proveedor)
- **No hay cookies httpOnly**: requerirían cambiar el backend, que no tocamos

```
src/auth/context/auth-context.ts        el contrato (useAuth)
src/auth/providers/cine-auth-provider   la implementación real
src/auth/require-auth.tsx               guardia de rutas privadas
```

> `tieneRol()` y esconder botones **no es seguridad**: solo evita ofrecer
> pantallas que el backend va a rechazar con 403.

---

## Endpoints disponibles

| Endpoint | Permiso | ¿Usado? |
|---|---|---|
| `GET /peliculas` | público, paginado | ✅ |
| `GET /files/pelicula/:nombre` | público | ✅ imágenes |
| `GET /cartelera/funciones` | público, acepta `?idPelicula=` | ✅ |
| `GET /cartelera/funciones/:id/asientos` | público, trae `disponible` | ✅ |
| `GET /cartelera/salas` | público | servicio listo, sin usar |
| `POST /auth/login` | público, 5 intentos/min | ✅ |
| `POST /reservas` | **CLIENTE** | ✅ |
| `POST /persona` | público, registro | pendiente |
| `GET /persona` | ADMIN, GERENTE | pendiente |
| `GET /auth/roles` | ADMIN, GERENTE | pendiente |
| `POST /auth/rol-usuario` | solo ADMIN | pendiente |
| `POST /peliculas` | ADMIN, GERENTE | pendiente |
| `POST /cartelera/funciones` | ADMIN, GERENTE | pendiente |

**Regla:** si el endpoint es público, la pantalla va fuera de `RequireAuth`.

---

## Trampas del backend (verificadas, no supuestas)

| Qué | Detalle |
|---|---|
| **`constrasena`** | `POST /persona` pide la clave con ese error de tipeo. `POST /auth/login` la pide bien escrita (`contrasena`). Con `forbidNonWhitelisted`, mandar la correcta en el registro da 400 |
| **`codigoReserva` vs `codigo`** | Al enviar la reserva el campo es `codigoReserva`; al responder viene como `codigo` |
| **Respuesta de reserva anidada** | `data.reserva.codigo`, no `data.codigo` |
| **Formatos de fecha distintos** | `/peliculas` devuelve ISO completa; `/cartelera/funciones` devuelve `"2026-09-17"` |
| **Respuestas no uniformes** | Unos endpoints envuelven en `{status, message, data}`, otros devuelven el arreglo pelado |
| **`documento` y `telefono` son string**, aunque parezcan números |

### Fallos de seguridad del backend (reportar, no arreglar)

1. **`POST /persona` acepta el `rol` del cuerpo.** Mandando `"rol": 1`
   cualquiera se crea ADMIN sin token (el `@Auth` está comentado).
   El arreglo ya existe en el mismo archivo: `/persona/gerente` hace
   `dataDto.rol = 2`. Desde el frontend **nunca enviamos `rol`**, así el
   backend aplica 3 (CLIENTE) por defecto.
2. **El cliente decide el precio.** `POST /reservas` usa el `total` y los
   `precio` del cuerpo; `funcion.precio` nunca se consulta. Verificado:
   precio real Bs 40, se aceptó Bs 1. (El DTO sí exige positivo, así que
   Bs 0 se rechaza.) Desde el frontend calculamos desde `funcion.precio`.
3. **`idCliente` viene del cuerpo**, no del token. Desde el frontend usamos
   `user.id` del token.
4. **Roles revocados siguen funcionando**: la consulta que arma el token no
   filtra por `rol_usuario.estado` ni `fecha_fin`.
5. **Sin migraciones ni `.sql` en el repo**: nadie puede recrear la base.

---

## Base de datos

PostgreSQL, base **`pruebadb`** (la anterior, `db-cine`, está obsoleta).
12 tablas en 4 esquemas: `cartelera`, `identidad`, `seguridad`, `ventas`.

Roles: **1 ADMIN · 2 GERENTE · 3 CLIENTE**

### Cuentas de prueba (solo desarrollo local)

```
ana.perez      / ClaveSegura123    ADMIN + CLIENTE
cliente.yujra  / Sergio2026        CLIENTE
sergio.yujra   / Sergio2026        CLIENTE
```

> No hay ningún GERENTE creado. Se crea con `POST /persona/gerente`, que
> fuerza el rol 2 y exige token de ADMIN.

---

## Estado actual

### Terminado

```
Recorrido público completo
  /peliculas         grilla de pósters (20 películas, 19 con imagen)
  /peliculas/:id     sinopsis + horarios de esa película
  /funciones/:id     mapa de butacas con disponibilidad

Autenticación
  Login real, token persistido, sesión que sobrevive a F5
  Interceptores de petición y respuesta

Reserva
  POST /reservas conectado al botón del mapa de butacas
```

### Pendiente

```
28   Registro público    POST /persona (sin enviar "rol")
     Hoy un visitante sin cuenta llega a un callejón sin salida:
     se le manda al login y no hay forma de crear una cuenta

—    Panel administrativo. Existe el layout (Demo1Layout con barra
     lateral) pero ninguna pantalla con datos. CarteleraPage (lista
     de las 20 funciones) está escrita y sin ruta: candidata a
     /panel/funciones

—    Destino por rol tras el login: ADMIN/GERENTE al panel,
     CLIENTE al catálogo

—    Proteger el panel por rol (RequireRole). Hoy RequireAuth solo
     pregunta "¿iniciaste sesión?", no "¿quién eres?"

—    Borrar los console.log con >>> antes de entregar.
     Dos de ellos imprimen el token completo
```

---

## Contexto del proyecto

Es el trabajo de un diplomado, y además **material de clase**: el autor enseña
frontend con este mismo proyecto. Por eso el código lleva comentarios
explicativos y se construye paso a paso, verificando cada pieza antes de
seguir.
