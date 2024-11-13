import {SimonItem} from '../../../../general/types/SimonItem.ts';

export const testCurrentSequence = (userSequence: Array<SimonItem>, currentSequence: Array<SimonItem>) => {
    const userSequenceString = userSequence.join('');
    const currentSequenceString = currentSequence.join('');
    if(userSequenceString === currentSequenceString) {
        return 'Finish';
    }
    return (currentSequence.join('').startsWith(userSequence.join(''))) ? 'Correct' : 'Incorrect';
};
