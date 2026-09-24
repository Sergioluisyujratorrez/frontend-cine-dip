
function requerida(nombre: string, valor:string | undefined) : string{
    if (!valor) {
        throw new Error(`Falta la variable ${nombre} en el archivo .env`);
    }
    return valor;
}

export const env = {
    apiUrl: requerida('VITE_CINE_API_URL', import.meta.env.VITE_CINE_API_URL),
} as const;