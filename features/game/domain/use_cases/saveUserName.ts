import {UserDataRepository} from '../../domain/repository/UserDataRepository.ts';

export function saveUserName(repository: UserDataRepository){
    return {
        execute: async function (userName: string){
            repository.setUserName(userName);
        },
    };
}
