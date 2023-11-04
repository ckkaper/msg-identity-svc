import { logger } from "../../config/logger";
import * as fs from "fs";

function readFile(filePath: string): string {
        return fs.readFileSync(filePath).toString();
}

export function readJsonFromFile(filePath: string) {
        return JSON.parse(readFile(filePath));
}

export function writeFile(filePath: string, data: string): void {
        fs.writeFileSync(filePath, data);
}

export function getCustomValue(obj: any, customKey: string) {
        if (obj.hasOwnProperty(customKey)) {
                return obj[customKey];
        } else {
                return undefined; // or any other default value you want
        }
}
