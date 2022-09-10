class Hora {
    constructor(fecha, hora, precio, bajoMedia) {
        this._fecha = fecha;
        this._hora = hora.substring(0,2);
        precio = precio/1000;
        this._precio = Number(precio.toFixed(3));
        this._bajoMedia = bajoMedia;
    }

    get fecha() {
        return this._fecha;
    }
    set fecha(fecha) {
        this._fecha = fecha;
    }
    get hora() {
        return this._hora;
    }
    set hora(hora) {
        this._hora = hora;
    }
    get precio() {
        return this._precio
    }
    set precio(precio) {
        this._precio = precio;
    }
    get bajoMedia() {
        return this._bajoMedia;
    }
    set bajoMedia(bajoMedia) {
        this._bajoMedia = bajoMedia;
    }
}