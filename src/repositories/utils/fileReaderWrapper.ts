import { logger } from "../../config/logger";
import * as fs from "fs";

function readFile(filePath: string): string {
        logger.info("STRATEGY:UTILS: reading file");
        return fs.readFileSync(filePath).toString();
}

export function readJsonFromFile(filePath: string) {
        logger.info("STRATEGY:UTILS: reading json file");
        return JSON.parse(readFile(filePath));
}

export function writeFile(filePath: string, data: string): void {
        logger.info('STRATEGY:UTILS: writing to file')
        fs.writeFileSync(filePath, data);
}
