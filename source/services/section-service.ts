import axios from "axios";
import config from "config";

import Section from "../models/section.js";
import Street from "../models/street.js";
import { Entity } from "../models/log.js";

import { fetchStreets } from "./street-service.js";
import log from "./log-service.js";

const ENTITY = Entity.SECTION;

export const getSectionsWithStreets = async () => {
    try {
        const sections = await fetchSections();
        const sectionsWithStreets = await addStreetsToSections(sections);
        return sectionsWithStreets;
    } catch (error: any) {
        log("Error while fetching sections", error.message, ENTITY);
        throw new Error("Error while fetching sections");
    }
};

export const getActiveSectionsWithStreets = async () => {
    try {
        const sections = await fetchSections();
        const activeSections = sections.filter((section: Section) => !section.deleted);
        const activeSectionsWithStreets = await addStreetsToSections(activeSections);
        return activeSectionsWithStreets;
    } catch (error: any) {
        log("Error while fetching active sections", error.message, ENTITY);
        throw new Error("Error while fetching active sections");
    }
};

export const fetchSections = async (): Promise<Section[]> => {
    try {
        const { data: sections } = await axios.get<Section[]>(`${config.get("apiUrl")}/sections`);
        return sections;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

const addStreetsToSections = async (sections: Section[]) => {
    try {
        const streets = await fetchStreets();

        const sectionsWithStreets = sections.map((section: Section) => {
            const street = streets.find((street: Street) => street.id === section.street_id);
            section.street_id = street!;
            return section;
        });

        return sectionsWithStreets;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
