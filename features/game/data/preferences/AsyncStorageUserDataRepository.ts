import {UserDataRepository} from '../../domain/repository/UserDataRepository.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Score} from '../../domain/model/Score.ts';

export class AsyncStorageUserDataRepository implements UserDataRepository {
    #storage;
    constructor() {
        this.#storage = AsyncStorage;
    }
    getUserName(): Promise<string | null> {
        return this.#storage.getItem('userName');
    }
    setUserName(name: string): void {
        this.#storage.setItem('userName', name);
    }
    async getScoreList(): Promise<Score[]> {
        const dataString = await this.#storage.getItem('scoreList');
        if (!dataString) {
            return [];
        }
        return JSON.parse(dataString);
    }
    async saveScore(score: number): Promise<void> {
        const scoreList = await this.getScoreList();
        scoreList.push({timestamp: new Date().toISOString(), score: score});
        await this.#storage.setItem('scoreList', JSON.stringify(scoreList));
    }

}
