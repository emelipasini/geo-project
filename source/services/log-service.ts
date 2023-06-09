import { resolve } from "path";
import config from "config";
import fs from "fs";

import { Log, Entity, LogType } from "../models/log.js";

const FILE_PATH = resolve(config.get("logging"));

export default function log(message: string, data: string, entity: Entity, type: LogType = LogType.ERROR) {
    const log = createLog(message, data, entity, type);
    saveLog(log);
}

function createLog(message: string, data: string, entity: Entity, type: LogType) {
    const newLog: Log = {
        id: getNextId(),
        type,
        entity,
        message,
        data,
        date: new Date(),
    };
    return newLog;
}

function getNextId() {
    const logs = getLogs();
    if (logs?.length === 0) {
        return 1;
    }
    const indexes = logs.map((log: Log) => log.id).sort((a: number, b: number) => b - a);
    return indexes[0] + 1;
}

function saveLog(log: Log) {
    const logs = getLogs();
    logs.push(log);
    fs.writeFileSync(FILE_PATH, JSON.stringify(logs));
}

function getLogs() {
    if (!fs.existsSync(FILE_PATH)) {
        fs.writeFileSync(FILE_PATH, "[]", "utf8");
    }

    const jsonLogs = fs.readFileSync(FILE_PATH, "utf8");
    const logs = JSON.parse(jsonLogs);
    return logs;
}
