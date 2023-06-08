import axios from "axios";
import dotenv from "dotenv";

import Section from "../models/section.js";
import Street from "../models/street.js";

dotenv.config();

export const getSections = async () => {
    try {
        const { data: sections } = await axios.get(`${process.env.API_URL}/sections`);
        const sectionsWithStreets = await addStreetsToSections(sections);
        return sectionsWithStreets;
    } catch (error) {
        throw new Error("Error while fetching sections");
    }
};

export const getActiveSections = async () => {
    const sections = await getSections();
    const sectionsWithStreets = await addStreetsToSections(sections);
    const activeSectionsWithStreets = sectionsWithStreets.filter((section: Section) => !section.fecha_baja);
    return activeSectionsWithStreets;
};

export const addStreetsToSections = async (sections: Section[]) => {
    try {
        const { data: streets } = await axios.get(`${process.env.API_URL}/streets`);

        const sectionsWithStreets = sections.map((section: Section) => {
            const street = streets.find((street: Street) => street.id_via === section.id_via);
            section.id_via = street!;
            return section;
        });

        return sectionsWithStreets;
    } catch (error) {
        throw new Error("Error while adding streets to sections");
    }
};
