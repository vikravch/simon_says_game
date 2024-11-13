import {Score} from '../model/Score.ts';

export type UserDataRepository = {
    getUserName(): Promise<string | null>;
    setUserName(name: string): void;
    getScoreList(): Promise<Array<Score>>;
    saveScore(score: number): Promise<void>;
}
