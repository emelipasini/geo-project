import Section from "./section";

type Street = {
    id_via: number;
    nombre_oficial: string;
    fecha_alta: Date;
    fecha_baja: Date;
    tramos?: Section[];
};

export default Street;
