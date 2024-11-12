import {Score, UserDataRepository} from '../../domain/repository/UserDataRepository.ts';

export class CollectionUserDataRepository implements UserDataRepository {
    #userName: string = '';
    #scoreList: Score[] = [];

    getUserName(): Promise<string | null> {
        return Promise.resolve(this.#userName);
    }
    setUserName(name: string): void {
        this.#userName = name;
    }
    getScoreList(): Promise<Score[]> {
        return Promise.resolve([...this.#scoreList]);
    }
    saveScore(score: number): Promise<void> {
        this.#scoreList.push({timestamp: new Date().toISOString(), score: score});
        return Promise.resolve(void 0);
    }
}
