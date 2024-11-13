import {UserDataRepository} from '../../domain/repository/UserDataRepository.ts';

export function saveUserResult(repository: UserDataRepository){
    return {
        execute: async function (score: number){
            await repository.saveScore(score);
            return await repository.getScoreList();
        },
    };
}
