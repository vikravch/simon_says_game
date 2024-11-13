import {simonGameBoardItems, SimonItem} from '../../../../general/types/SimonItem.ts';

const itemsOptionsString = simonGameBoardItems.join('');
export const generateRandomItem = (): SimonItem => {
    return itemsOptionsString.at(Math.random() * simonGameBoardItems.length) as SimonItem;
};
export const generateSequence = (length: number): Array<SimonItem> => {
    const res: Array<SimonItem> = [];
    for (let i = 0; i < length; i++) {
        res.push(generateRandomItem());
    }
    return res;
};

export const generateSequenceFromPrevious = (previousSequence: SimonItem[]): SimonItem[] => {
    return previousSequence.concat(generateRandomItem());
};
