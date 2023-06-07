import axios from "axios";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";

import Street from "../models/street.js";

dotenv.config();

export const getStreets = async () => {
    const { data: streets } = await axios.get(`${process.env.API_URL}/streets`);
    return streets.filter((street: any) => !street.fecha_baja);
};

export const getAllStreets = async () => {
    const { data: streets } = await axios.get(`${process.env.API_URL}/streets`);
    return streets;
};

export const saveNewStreet = async (street: Street) => {
    street.id_via = uuid();

    const newStreet = {
        id_via: street.id_via,
        nombre_oficial: street.nombre_oficial,
        fecha_alta: street.fecha_alta,
        fecha_baja: street.fecha_baja,
    };

    const { data: streets } = await axios.post(`${process.env.API_URL}/streets`, newStreet);
    return streets;
};
