import {SimonItem} from "../../../../general/types/SimonItem.ts";

const itemsOptionsString = 'RGYB';
export const generateRandomItem = (): SimonItem => {
    return itemsOptionsString.at(Math.random()*4) as SimonItem;
}
export const generateSequence = (length: number): Array<SimonItem> => {
    const res: Array<SimonItem> = [];
    for (let i = 0; i < length; i++) {
        res.push(generateRandomItem());
    }
    return res;
}