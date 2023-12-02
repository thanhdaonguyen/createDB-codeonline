import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);
__dirname = path.dirname(__dirname);

console.log(__dirname);
export default __dirname;
