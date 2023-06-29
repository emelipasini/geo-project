import type Street from "./street";

type Section = {
    readonly id: number;
    street_id?: number | Street;
    initial_left: number;
    initial_right: number;
    end_left: number;
    end_right: number;
    street_type: number;
    geometry: string;
    created: Date;
    deleted: Date | null;
};

export default Section;
