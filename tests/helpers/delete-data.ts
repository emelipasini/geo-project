import config from "config";
import { resolve } from "path";
import fs from "fs";

export function deleteData() {
    fs.writeFileSync(resolve(config.get("database")), JSON.stringify({}));
}
