import Section from "./section";

type Street = {
    id: number;
    name: string;
    created: Date;
    deleted: Date | null;
    sections?: Section[];
};

export default Street;
