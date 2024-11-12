import {UserDataRepository} from '../../domain/repository/UserDataRepository.ts';

export function saveUserName(repository: UserDataRepository){
    return {
        execute: async function (userName: string){
            console.log('Save user result', userName);
            repository.setUserName(userName);
        },
    };
}
