import {SimonItem} from "../../../../general/types/SimonItem.ts";

/**
 * Use case which check current sequence and user sequence. May throw 'Finish' error when sequence is finished.
 * @param userSequence
 * @param currentSequence
 */
export const testCurrentSequence = (userSequence: Array<SimonItem>, currentSequence: Array<SimonItem>) => {
    const userSequenceString = userSequence.join('');
    const currentSequenceString = currentSequence.join('');
    if(userSequenceString === currentSequenceString) throw 'Finish';
    return currentSequence.join('').startsWith(userSequence.join(''));
}