import { deleteData } from "./helpers/delete-data";

export default async function globalTeardown() {
    deleteData();
}
