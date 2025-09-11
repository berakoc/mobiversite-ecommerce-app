import { JSONFilePreset } from "lowdb/node";

// Create or load db.json
const defaultData = { products: [], users: [], orders: [] };
const db = await JSONFilePreset("db.json", defaultData);

export default db;
