import axios from "axios";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";

import Section from "../models/section.js";

dotenv.config();

export const getSections = async (): Promise<Section[]> => {
    const { data: sections } = await axios.get(`${process.env.API_URL}/sections`);
    return sections.filter((section: any) => !section.fecha_baja);
};

export const getAllSections = async () => {
    const { data: sections } = await axios.get(`${process.env.API_URL}/sections`);
    return sections;
};
