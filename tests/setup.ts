import axios from "axios";
import config from "config";

import { createData } from "./helpers/create-data";

export default async function globalSetup() {
    const seedData = createData();

    seedData.streets.forEach(async (street) => {
        await axios.post(`${config.get("apiUrl")}/streets`, street);
    });
    seedData.sections.forEach(async (section) => {
        await axios.post(`${config.get("apiUrl")}/sections`, section);
    });
}
