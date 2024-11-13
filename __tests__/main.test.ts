import {it} from '@jest/globals';
import {testCurrentSequence} from '../features/game/domain/use_cases/testCurrentSequence.ts';
it('main function',()=>{
    //console.log(generateRandomItem());

    //console.log(generateSequence(3));

    console.log(testCurrentSequence([ 'B', 'R', 'R' ],[ 'B', 'R', 'R', 'Y' ]));
    console.log(testCurrentSequence([ 'B', 'Y', 'R' ],[ 'B', 'R', 'R', 'Y' ]));

    try{
        console.log(testCurrentSequence([ 'B', 'R', 'R' ],[ 'B', 'R', 'R' ]));
    } catch (e){
        console.log(e);
    }
});

