import { faker } from "@faker-js/faker";
import assert from "assert";

import Street from "../../source/models/street";
import Section from "../../source/models/section";

import {
    fetchStreets,
    getStreetCount,
    getActiveStreetCount,
    findStreetById,
    getActiveStreetsWithSections,
    getStreetsWithSections,
    saveNewStreet,
} from "../../source/services/street-service";

import { createData } from "../helpers/create-data";
import { deleteData } from "../helpers/delete-data";

describe("Street service test suit", () => {
    let data: { streets: Street[]; sections: Section[] };

    beforeAll(() => {
        data = createData();
    });

    afterAll(() => {
        deleteData();
    });

    it("should return all the streets", async () => {
        const streets = data.streets;
        const fetchedStreets = await fetchStreets();

        assert.deepEqual(fetchedStreets, streets);
    });

    it("should return the amount of streets", async () => {
        const streets = data.streets;
        const streetCount = await getStreetCount();

        assert(streetCount === streets.length);
    });

    it("should return the amount of active streets", async () => {
        const streets = data.streets;
        const activeStreets = streets.filter((street) => !street.deleted);
        const activeStreetCount = await getActiveStreetCount();

        assert(activeStreetCount === activeStreets.length);
    });

    it("should return a street by id", async () => {
        const streets = data.streets;
        const street = streets[0];

        const fetchedStreet = await findStreetById(street.id);
        delete fetchedStreet?.sections;

        assert.deepEqual(fetchedStreet, street);
    });

    it("should return all the streets with sections", async () => {
        const streets = data.streets;
        const sections = data.sections;
        streets[0].sections = [sections[0]];
        streets[1].sections = [sections[1]];
        streets[2].sections = [sections[2]];

        const fetchedStreets = await getStreetsWithSections();

        assert.deepEqual(fetchedStreets, streets);
    });

    it("should return all the active streets with sections", async () => {
        const streets = data.streets;
        const sections = data.sections;
        const activeStreets = [streets[0], streets[2]];
        activeStreets[0].sections = [sections[0]];
        activeStreets[1].sections = [sections[2]];

        const fetchedActiveStreets = await getActiveStreetsWithSections();

        assert.deepEqual(fetchedActiveStreets, activeStreets);
    });

    it("should save a new street", async () => {
        const streetName = faker.location.street();
        const newStreet = await saveNewStreet(streetName);

        const savedStreet = await findStreetById(newStreet.id);
        delete savedStreet?.sections;

        assert.deepEqual(newStreet, savedStreet);
    });

    it("should fail if the street already exists", async () => {
        const oldStreet = data.streets[0];

        await assert.rejects(async () => {
            await saveNewStreet(oldStreet.name);
        }, Error);
    });
});
