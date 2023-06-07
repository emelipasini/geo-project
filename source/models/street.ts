class Street {
    id_via: string;
    nombre_oficial: string;
    fecha_alta: Date;
    fecha_baja: Date;

    constructor(id_via: string, nombre_oficial: string, fecha_alta: Date, fecha_baja: Date) {
        this.id_via = id_via;
        this.nombre_oficial = nombre_oficial;
        this.fecha_alta = fecha_alta;
        this.fecha_baja = fecha_baja;
    }
}

export default Street;
