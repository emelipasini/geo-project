import { faker } from "@faker-js/faker";
import config from "config";
import { resolve } from "path";
import fs from "fs";

import Section from "../../source/models/section.js";
import Street from "../../source/models/street.js";

export function createData() {
    const streets = createStreets();
    const ids = streets.map((street: Street) => street.id);
    const sections = createSections(ids);

    const data = { streets, sections };
    fs.writeFileSync(resolve(config.get("database")), JSON.stringify(data));
}

function createStreets() {
    let streets: Street[] = [];

    for (let i = 0; i < 3; i++) {
        const street = {
            id: faker.number.int({ min: 1, max: 5000 }),
            name: faker.location.street(),
            created: faker.date.past(),
            deleted: i === 1 ? faker.date.recent() : null,
        };
        streets.push(street);
    }

    return streets;
}

function createSections(ids: number[]) {
    let sections: Section[] = [];

    for (let i = 0; i < ids.length; i++) {
        const section = {
            id: faker.number.int({ min: 1, max: 5000 }),
            street_id: ids[i],
            street_type: faker.number.int({ min: 1, max: 16 }),
            initial_left: faker.number.int({ min: 1, max: 5000 }),
            initial_right: this.initial_left + 1,
            end_left: this.initial_left + 100,
            end_right: this.end_left + 100,
            geometry: `LINESTRING (${faker.location.latitude()}, ${faker.location.longitude()})`,
            created: faker.date.past(),
            deleted: i === 1 ? faker.date.recent() : null,
        };
        sections.push(section);
    }

    return sections;
}