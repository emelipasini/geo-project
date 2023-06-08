import Street from "./street";

type Section = {
    id_tramo: number;
    id_via: number | Street;
    alt_izqini: number;
    alt_derini: number;
    alt_izqfin: number;
    alt_derfin: number;
    geom: string;
    fecha_alta: Date;
    fecha_baja: Date;
};

export default Section;
