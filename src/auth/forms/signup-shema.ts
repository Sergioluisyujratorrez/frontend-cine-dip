import { z } from 'zod';

/**
 * Validacion del registro.
 */
export const getSignupSchema = () =>
  z.object({
    nombres: z.string().min(1, { message: 'Ingresa tus nombres' }),
    apellidos: z.string().min(1, { message: 'Ingresa tus apellidos' }),
    documento: z.string().min(1, { message: 'Ingresa tu documento' }),
    telefono: z.string().min(1, { message: 'Ingresa tu telefono' }),
    email: z.string().email({ message: 'Correo no valido' }),
    fechaNacimiento: z.string().min(1, { message: 'Ingresa tu fecha nacimiento' }),
    usuario: z.string().min(1, { message: 'Elige un nombre usuario' }),
    constrasena: z
    .string()
    .min(6, { message: 'Minimo 6 caracteres' })
    .max(50, {message: 'Maximo 50 caracteres'}),
    confirmar: z.string()
  })
  .refine((datos) => datos.constrasena === datos.confirmar, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmar']
  });

export type SignupSchemaType = z.infer<ReturnType<typeof getSignupSchema>>;
