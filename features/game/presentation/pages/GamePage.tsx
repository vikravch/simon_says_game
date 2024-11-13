import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../../general/redux/store.ts';
import * as Actions from '../redux.ts';
import {PageWrapper} from '../../../../App.tsx';
import SGButton from '../components/SGButton.tsx';
import ButtonsGameBoard from '../components/ButtonsGameBoard.tsx';
import SGResultModal from '../components/SGResultModal.tsx';
import {delay} from '../../../../general/utils/delay.ts';
import {makeSound} from '../makeSound.ts';

const DELAY_BEFORE_DEMONSTRATION = 2000;
const DELAY_BETWEEN_DEMONSTRATION = 1000; // delay will be x2

function GamePage({navigation}: any) {
    const dispatch = useAppDispatch();
    const {
        isGameStarted,
        currentSequenceItemForDemo,
        gameSequence,
        isDemoDelay,
    } = useAppSelector(store => store.gameReducer);

    useEffect(() => {
        dispatch(Actions.initUserData());
    }, [dispatch]);

    const onHandleStartBtnClick = async () => {
        dispatch(Actions.startGame());
        await delay(DELAY_BEFORE_DEMONSTRATION);
        dispatch(Actions.initSequenceDemonstration());
        await demonstrateCurrentSequence();
    };

    const demonstrateCurrentSequence = async () => {
        await delay(DELAY_BETWEEN_DEMONSTRATION);
        dispatch(Actions.demonstrateCurrent());
    };

    if (currentSequenceItemForDemo > -1) {
        delay(DELAY_BETWEEN_DEMONSTRATION).then(async () => {
            if(!isDemoDelay){
                makeSound();
            }
            await demonstrateCurrentSequence();
        });
    }

    const onClosed = () => { navigation.replace('Results');};

    return (
        <PageWrapper>
            <ButtonsGameBoard/>
            {(currentSequenceItemForDemo > -1) && <Text style={styles.h2}>Simon is saying...</Text>}
            {(gameSequence.length > 0) && <Text style={styles.h2}>Round {gameSequence.length}</Text>}
            <View style={styles.buttonsSection} >
                {!isGameStarted && <SGButton title={'Start'} onPress={onHandleStartBtnClick} disabled={isGameStarted}/>}
            </View>
            <SGResultModal onClosed={onClosed}/>
        </PageWrapper>
    );
}

const styles = StyleSheet.create({
    buttonsSection: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    h2: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 40,
    },
});

export default GamePage;
