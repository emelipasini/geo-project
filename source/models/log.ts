export type Log = {
    id: number;
    type: LogType;
    message: string;
    data: string;
    date: Date;
};

export enum LogType {
    INFO = "INFO",
    WARNING = "WARNING",
    ERROR = "ERROR",
}
