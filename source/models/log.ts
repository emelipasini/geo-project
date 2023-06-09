export type Log = {
    id: number;
    type: LogType;
    entity: Entity;
    message: string;
    data: string;
    date: Date;
};

export enum Entity {
    STREET = "STREET",
    SECTION = "SECTION",
}

export enum LogType {
    INFO = "INFO",
    WARNING = "WARNING",
    ERROR = "ERROR",
}
