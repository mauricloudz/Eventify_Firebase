export interface User {
    uid: string;
    username: string;
    email: string;
    password: string;
    nivel: number,
    datos: [{
        nombre: string,
        apellido: string,
        edad: string,
        whatsapp: string,
        carrera: string,
        sede: string
    }]
}