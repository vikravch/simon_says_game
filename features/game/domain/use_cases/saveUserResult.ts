import {UserDataRepository} from '../../domain/repository/UserDataRepository.ts';

export function saveUserResult(repository: UserDataRepository){
    return {
        execute: async function (score: number){
            console.log('Save user result', score);
            await repository.saveScore(score);
            return await repository.getScoreList();
        },
    };
}
