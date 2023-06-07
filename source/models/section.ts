class Section {
    id_tramo: number;
    id_via: number;
    alt_izqini: number;
    alt_derini: number;
    alt_izqfin: number;
    alt_derfin: number;
    geom: string;
    fecha_alta: Date;
    fecha_baja: Date;

    constructor(
        id_tramo: number,
        id_via: number,
        alt_izqini: number,
        alt_derini: number,
        alt_izqfin: number,
        alt_derfin: number,
        geom: string,
        fecha_alta: Date,
        fecha_baja: Date
    ) {
        this.id_tramo = id_tramo;
        this.id_via = id_via;
        this.alt_izqini = alt_izqini;
        this.alt_derini = alt_derini;
        this.alt_izqfin = alt_izqfin;
        this.alt_derfin = alt_derfin;
        this.geom = geom;
        this.fecha_alta = fecha_alta;
        this.fecha_baja = fecha_baja;
    }
}

export default Section;
