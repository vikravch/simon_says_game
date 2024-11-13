import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {SimonItem} from '../../../../general/types/SimonItem.ts';
import {useAppDispatch, useAppSelector} from '../../../../general/redux/store.ts';
import * as Actions from '../redux.ts';
import HapticFeedback from 'react-native-haptic-feedback';
import {makeSound} from '../makeSound.ts';

type Props = {
    style: StyleProp<ViewStyle>
    itemValue: SimonItem;
}
function SgBoardItem({style, itemValue}: Props) {
    const dispatch = useAppDispatch();
    const {
        isGameStarted,
        currentSequenceItemForDemo,
        isDemoDelay,
        gameSequence,
    } = useAppSelector(store => store.gameReducer);

    const onHandleSimonItemClick = (itemValue: SimonItem) => {
        makeSound();
        dispatch(Actions.simonItemClicked(itemValue));
    };

    const checkItemButtonDisabled = (): boolean => (currentSequenceItemForDemo > -1) || !isGameStarted;

    const currentButtonToShow = (currentSequenceItemForDemo > -1) ?
        gameSequence?.at(currentSequenceItemForDemo) : undefined;

    const calculateItemColor = (itemValue: SimonItem): string => {
        switch (itemValue) {
            case 'R':
                return styles.itemR.backgroundColor;
            case 'G':
                return styles.itemG.backgroundColor;
            case 'Y':
                return styles.itemY.backgroundColor;
            case 'B':
                return styles.itemB.backgroundColor;
            default:
                return 'gray';
        }
    };

    return (
        <TouchableOpacity style={[style, styles.gameItemButton, (currentButtonToShow === itemValue && !isDemoDelay) ?
            styles.itemActive : {backgroundColor: calculateItemColor(itemValue)}]}
                   disabled={checkItemButtonDisabled()}
                   onPress={() => onHandleSimonItemClick(itemValue)} />
    );
}

const styles = StyleSheet.create({
    gameItemButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    itemR: {
        backgroundColor: 'red',
    },
    itemG: {
        backgroundColor: 'green',
    },
    itemY: {
        backgroundColor: 'yellow',
    },
    itemB: {
        backgroundColor: 'blue',
    },
    itemActive: {
        backgroundColor: 'gray',
        opacity: 0.5,
    },
});

export default SgBoardItem;
