import assert from "assert";
import config from "config";
import { resolve } from "path";
import fs from "fs";

import Street from "../../source/models/street";
import Section from "../../source/models/section";

import {
    fetchSections,
    getSectionCount,
    getActiveSectionCount,
    findSectionById,
    getActiveSectionsWithStreets,
    getSectionsWithStreets,
} from "../../source/services/section-service";

describe("Section service test suit", () => {
    let data: { streets: Street[]; sections: Section[] };

    beforeAll(async () => {
        const seedData = fs.readFileSync(resolve(config.get("database")), "utf-8");
        data = JSON.parse(seedData);
    });

    it("should return all the sections", async () => {
        const sections = data.sections;
        const fetchedSections = await fetchSections();

        assert.deepEqual(fetchedSections, sections);
    });

    it("should return the amount of sections", async () => {
        const sections = data.sections;
        const sectionCount = await getSectionCount();

        assert(sectionCount === sections.length);
    });

    it("should return the amount of active sections", async () => {
        const sections = data.sections;
        const activeSections = sections.filter((section) => !section.deleted);
        const activeSectionCount = await getActiveSectionCount();

        assert(activeSectionCount === activeSections.length);
    });

    it("should return a section by id", async () => {
        const sections = data.sections;
        const section = sections[0];

        let fetchedSection = await findSectionById(section.id);
        if (fetchedSection && fetchedSection.street_id) {
            fetchedSection.street_id = (fetchedSection.street_id as Street).id;
        }

        assert.deepEqual(fetchedSection, section);
    });

    it("should return all the sections with streets", async () => {
        const sections = data.sections;
        const streets = data.streets;
        sections[0].street_id = streets[0];
        sections[1].street_id = streets[1];
        sections[2].street_id = streets[2];

        const fetchedSections = await getSectionsWithStreets();

        assert.deepEqual(fetchedSections, sections);
    });

    it("should return all the active sections with streets", async () => {
        const sections = data.sections;
        const streets = data.streets;

        const activeSections = [sections[0], sections[2]];
        sections[0].street_id = streets[0];
        sections[1].street_id = streets[2];

        const fetchedSections = await getActiveSectionsWithStreets();

        assert.deepEqual(fetchedSections, activeSections);
    });
});
