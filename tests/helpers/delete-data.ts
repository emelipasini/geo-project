import config from "config";
import { resolve } from "path";
import fs from "fs";

import Street from "../../source/models/street";
import Section from "../../source/models/section";

export function deleteData() {
    let data: { streets: Street[]; sections: Section[] };

    data = { streets: [], sections: [] };
    fs.writeFileSync(resolve(config.get("database")), JSON.stringify(data));
}
