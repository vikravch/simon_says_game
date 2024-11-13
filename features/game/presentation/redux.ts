import {SimonItem} from '../../../general/types/SimonItem.ts';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {useCases} from '../../../App.tsx';
import {Score} from '../domain/repository/UserDataRepository.ts';

const initialState = {
    // Game lifecycle flags
    isGameStarted: false,
    isShowErrorMessage: false,
    // User data
    userName: '',
    scoreList: new Array<Score>(0),
    lastUserResult: 0,
    // Demo data
    currentSequenceItemForDemo: -2,
    isDemoDelay: false,
    // Game data
    gameSequence: new Array<SimonItem>(0),
    currentSequence: new Array<SimonItem>(0),
};


const gameReducer = createSlice({
    name: 'bank',
    initialState: initialState,
    reducers: {
        startGame(state) {
            state.isGameStarted = true;
            state.isShowErrorMessage = false;

            //state.gameSequence = useCases.generateSequence(state.gameSequence.length + 1);
            state.gameSequence = useCases.generateSequenceFromPrevious(state.gameSequence);
            console.log('Game sequence generated - ' + state.gameSequence);
        },
        initSequenceDemonstration(state) {
            state.currentSequenceItemForDemo = 0;
        },
        demonstrateCurrent(state) {
            if (state.isDemoDelay) {
                state.isDemoDelay = false;
            } else {
                if (state.currentSequenceItemForDemo < state.gameSequence.length - 1) {
                    state.isDemoDelay = true;
                    state.currentSequenceItemForDemo++;
                } else {
                    console.log('Finish demonstration!');
                    state.currentSequenceItemForDemo = -2;
                }
            }
        },
        simonItemClicked(state, action) {
            const itemClicked = action.payload as SimonItem;
            console.log('Clicked on - ' + itemClicked);
            const newUserSequence = state.currentSequence.concat(itemClicked);
            console.log('New user sequence - ' + newUserSequence + ' current sequence - ' + state.gameSequence);

            if (useCases.testCurrentSequence(newUserSequence, state.gameSequence) === 'Correct') {
                state.currentSequence = newUserSequence;
                console.log('Deal with this sequence!');
            } else if (useCases.testCurrentSequence(newUserSequence, state.gameSequence) === 'Incorrect') {
                console.log('Error with this sequence!');
                state.lastUserResult = state.gameSequence.length - 1;

                state.gameSequence = [];
                state.currentSequence = [];

                state.isGameStarted = false;
                state.isShowErrorMessage = true;

            } else if (useCases.testCurrentSequence(newUserSequence, state.gameSequence) === 'Finish'){
                console.log('Finish this sequence!');
                //state.gameSequence = useCases.generateSequence(state.gameSequence.length + 1);
                state.gameSequence = useCases.generateSequenceFromPrevious(state.gameSequence);
                state.currentSequence = [];

                console.log('New sequence - ' + state.gameSequence);

                state.currentSequenceItemForDemo = 0;
                state.isDemoDelay = true;
            }
        },
        saveUserResult(state) {
            useCases.saveUserResult.execute(state.lastUserResult);
            state.lastUserResult = 0;
        },
    },
    extraReducers: builder => {
        builder.addCase(initUserData.fulfilled, (state, action) => {
            state.scoreList = action.payload.scoreList;
            state.userName = action.payload.userName;
        });
        builder.addCase(setUserName.fulfilled, (state, action) => {
            state.userName = action.payload;
            state.isShowErrorMessage = false;
        });
        builder.addCase(saveNewScore.fulfilled, (state, action) => {
            state.scoreList = action.payload;
            state.isShowErrorMessage = false;
        });
    },
});

export const initUserData = createAsyncThunk('fetchUserData', () => {
    return useCases.getUserData.execute();
});

export const setUserName = createAsyncThunk<string, string>('saveUserName', (userName) => {
    console.log('Save user name', userName);
    useCases.saveUserName.execute(userName);
    return userName;
});

export const saveNewScore = createAsyncThunk<Score[], number>('saveNewScore', (score) => {
    console.log('Save user name', score);
    return useCases.saveUserResult.execute(score);
});


export const {
    startGame,
    initSequenceDemonstration,
    demonstrateCurrent,
    simonItemClicked,
} = gameReducer.actions;
export default gameReducer.reducer;
