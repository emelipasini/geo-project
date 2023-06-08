import axios from "axios";
import dotenv from "dotenv";

import Street from "../models/street.js";

dotenv.config();

const fetchStreets = async (): Promise<Street[]> => {
    try {
        const { data: streets } = await axios.get(`${process.env.API_URL}/streets`);
        return streets;
    } catch (error) {
        throw new Error("Error while fetching streets");
    }
};

export const getStreets = async (): Promise<Street[]> => {
    try {
        const streets = await fetchStreets();
        const streetsWithSections = await addSectionsToStreets(streets);
        return streetsWithSections;
    } catch (error) {
        throw new Error("Error while fetching sections");
    }
};

export const getActiveStreets = async () => {
    const streets = await getStreets();
    const streetsWithSections = await addSectionsToStreets(streets);
    const activeStreetsWithSections = streetsWithSections.filter((street: Street) => !street.fecha_baja);
    return activeStreetsWithSections;
};

export const addSectionsToStreets = async (streets: Street[]) => {
    try {
        const { data: sections } = await axios.get(`${process.env.API_URL}/sections`);

        const streetsWithSections = streets.map((street: Street) => {
            const streetSections = sections.filter((section: Street) => section.id_via === street.id_via);
            street.tramos = streetSections;
            return street;
        });

        return streetsWithSections;
    } catch (error) {
        throw new Error("Error while adding sections to streets");
    }
};

export const saveNewStreet = async (name: string): Promise<Street> => {
    try {
        const streets = await fetchStreets();

        const indexes = streets.map((street: Street) => street.id_via).sort((a, b) => b - a);

        const newStreet = {
            id_via: indexes[0] + 1,
            nombre_oficial: name,
            fecha_alta: new Date(),
            fecha_baja: null,
        };

        const { data: street } = await axios.post(`${process.env.API_URL}/streets`, newStreet);
        return street;
    } catch (error) {
        throw new Error("Error while saving new street");
    }
};
