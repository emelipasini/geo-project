import axios from "axios";
import config from "config";

import type Street from "../models/street.js";
import type Section from "../models/section.js";
import { Entity } from "../models/log.js";

import { fetchSections } from "./section-service.js";
import log from "./log-service.js";

const ENTITY = Entity.STREET;

export const getStreetCount = async (): Promise<number> => {
    try {
        const streets = await fetchStreets();
        return streets.length;
    } catch (error: any) {
        log("Error while fetching street count", error.message, ENTITY);
        throw new Error("Error while fetching street count");
    }
};

export const getActiveStreetCount = async (): Promise<number> => {
    try {
        const streets = await fetchStreets();
        const activeStreets = streets.filter((street: Street) => street.deleted === null);
        return activeStreets.length;
    } catch (error: any) {
        log("Error while fetching active street count", error.message, ENTITY);
        throw new Error("Error while fetching active street count");
    }
};

export const findStreetById = async (id: number): Promise<Street | undefined> => {
    try {
        const streets = await fetchStreets();
        const street = streets.find((street: Street) => street.id === id);
        if (street !== undefined) {
            const streetWithSections = await addSectionsToStreets([street]);
            return streetWithSections[0];
        }
    } catch (error: any) {
        log("Error while fetching street by id", error.message, ENTITY);
        throw new Error("Error while fetching street by id");
    }
};

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

export const getActiveStreetsWithSections = async (): Promise<Street[]> => {
    try {
        const streets = await fetchStreets();
        const activeStreets = streets.filter((street: Street) => street.deleted === null);
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
        const streetAlreadyExists = streets.find((street: Street) => street.name === name);
        if (streetAlreadyExists !== undefined) {
            throw new Error("Error: street already exists");
        }

        const indexes = streets.map((street: Street) => street.id).sort((a, b) => b - a);
        const newStreet = {
            id: indexes[0] + 1,
            name,
            created: new Date(),
            deleted: null,
        };

        const url: string = config.get("apiUrl");
        const { data: street } = await axios.post(`${url}/streets`, newStreet);
        return street;
    } catch (error: any) {
        log("Error while saving new street", error.message, ENTITY);
        throw new Error(error.message);
    }
};

export const fetchStreets = async (): Promise<Street[]> => {
    try {
        const url: string = config.get("apiUrl");
        const { data: streets } = await axios.get<Street[]>(`${url}/streets`);
        return streets;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

const addSectionsToStreets = async (streets: Street[]): Promise<Street[]> => {
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
