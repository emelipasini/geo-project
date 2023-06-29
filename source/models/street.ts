import type Section from "./section";

type Street = {
    readonly id: number;
    name: string;
    created: Date;
    deleted: Date | null;
    sections?: Section[];
};

export default Street;
