import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import gameReducer from '../../features/game/presentation/redux.ts';
import { createLogger } from 'redux-logger';

const logger = createLogger();

export const store = configureStore({
    reducer: {gameReducer},

    /*middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(logger),*/
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
