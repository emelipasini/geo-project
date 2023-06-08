import axios from "axios";
import dotenv from "dotenv";

import Street from "../models/street.js";

dotenv.config();

export const getStreets = async (): Promise<Street[]> => {
    try {
        const { data: streets } = await axios.get(`${process.env.API_URL}/streets`);
        const streetsWithSections = await addSectionsToStreets(streets);
        return streetsWithSections;
    } catch (error) {
        throw new Error("Error while fetching sections");
    }
};

export const getActiveStreets = async () => {
    const streets = await getStreets();
    const streetsWithSections = await addSectionsToStreets(streets);
    const activeStreetsWithSections = streetsWithSections.filter((street: any) => !street.fecha_baja);
    return activeStreetsWithSections;
};

export const addSectionsToStreets = async (streets: Street[]) => {
    try {
        const { data: sections } = await axios.get(`${process.env.API_URL}/sections`);

        const streetsWithSections = streets.map((street: Street) => {
            const streetSections = sections.filter((section: any) => section.id_via === street.id_via);
            street.tramos = streetSections;
            return street;
        });

        return streetsWithSections;
    } catch (error) {
        throw new Error("Error while adding sections to streets");
    }
};

export const saveNewStreet = async (street: Street): Promise<Street[]> => {
    street.id_via = 3;

    const newStreet = {
        id_via: street.id_via,
        nombre_oficial: street.nombre_oficial,
        fecha_alta: street.fecha_alta,
        fecha_baja: street.fecha_baja,
    };

    const { data: streets } = await axios.post(`${process.env.API_URL}/streets`, newStreet);
    return streets;
};
