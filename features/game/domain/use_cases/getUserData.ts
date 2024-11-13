import { UserDataRepository } from '../repository/UserDataRepository';
export function getUserData(repository: UserDataRepository){
  return {
      execute: async function (){
            return {
                userName: (await repository.getUserName()) || '',
                scoreList: (await repository.getScoreList()) || [],
            };
      },
  };
}
