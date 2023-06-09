import axios from "axios";
import config from "config";

import Street from "../models/street.js";
import Section from "../models/section.js";
import { Entity } from "../models/log.js";

import { fetchSections } from "./section-service.js";
import log from "./log-service.js";

const ENTITY = Entity.STREET;

export const getStreetsWithSections = async (): Promise<Street[]> => {
    try {
        const streets = await fetchStreets();
        const streetsWithSections = await addSectionsToStreets(streets);
        return streetsWithSections;
    } catch (error: any) {
        log("Error while fetching streets", error.message, ENTITY);
        throw new Error("Error while fetching streets");
    }
};

export const getActiveStreetsWithSections = async () => {
    try {
        const streets = await fetchStreets();
        const activeStreets = streets.filter((street: Street) => !street.deleted);
        const activeStreetsWithSections = await addSectionsToStreets(activeStreets);
        return activeStreetsWithSections;
    } catch (error: any) {
        log("Error while fetching active streets", error.message, ENTITY);
        throw new Error("Error while fetching active streets");
    }
};

export const saveNewStreet = async (name: string): Promise<Street> => {
    try {
        const streets = await fetchStreets();
        const indexes = streets.map((street: Street) => street.id).sort((a, b) => b - a);

        const newStreet = {
            id_via: indexes[0] + 1,
            nombre_oficial: name,
            fecha_alta: new Date(),
            fecha_baja: null,
        };

        const { data: street } = await axios.post(`${config.get("apiUrl")}/streets`, newStreet);
        return street;
    } catch (error: any) {
        log("Error while saving new street", error.message, ENTITY);
        throw new Error("Error while saving new street");
    }
};

export const fetchStreets = async (): Promise<Street[]> => {
    try {
        const { data: streets } = await axios.get<Street[]>(`${config.get("apiUrl")}/streets`);
        return streets;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

const addSectionsToStreets = async (streets: Street[]) => {
    try {
        const sections = await fetchSections();

        const streetsWithSections = streets.map((street: Street) => {
            const streetSections = sections.filter((section: Section) => section.street_id === street.id);
            street.sections = streetSections;
            return street;
        });

        return streetsWithSections;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
