export interface Producto {
    id: string,
    nombre: string,
    precio: number,
    esVegano: boolean,
    esCeliaco: boolean,
    ingredientes: string,
    fotoUrl: string
}