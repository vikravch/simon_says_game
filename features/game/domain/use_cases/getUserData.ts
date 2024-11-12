import { UserDataRepository } from '../repository/UserDataRepository';
export function getUserData(repository: UserDataRepository){
  return {
      execute: async function (){
            // Get user list from the database
            console.log('User list fetched');
            return {
                userName: (await repository.getUserName()) || '',
                scoreList: (await repository.getScoreList()) || [],
            };
      },
  };
}
