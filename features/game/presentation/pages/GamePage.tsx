import React, {useEffect, useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {SimonItem} from '../../../../general/types/SimonItem.ts';
import {useAppDispatch, useAppSelector} from '../../../../general/redux/store.ts';
import * as Actions from '../redux.ts';
import {PageWrapper} from '../../../../App.tsx';
import SGButton from '../components/SGButton.tsx';

async function delay(timeInMilliseconds: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, timeInMilliseconds);
    });
}

function GamePage({navigation}: any) {
    const dispatch = useAppDispatch();
    const {
        isGameStarted,
        currentSequenceItemForDemo,
        isDemoDelay,
        gameSequence,
        isShowErrorMessage,
        lastUserResult,
        userName,
    } = useAppSelector(store => store);

    useEffect(() => {
        dispatch(Actions.initUserData());
    }, [dispatch]);

    const onHandleStartBtnClick = async () => {
        await delay(2000);
        dispatch(Actions.startGame());
        dispatch(Actions.initSequenceDemonstration());
        await demonstrateCurrentSequence();
    };
    const demonstrateCurrentSequence = async () => {
        console.log('New item number - ' + currentSequenceItemForDemo);
        await delay(2000);
        dispatch(Actions.demonstrateCurrent());
    };
    const onPressStartDemonstration = async () => {
        dispatch(Actions.initSequenceDemonstration());
        await demonstrateCurrentSequence();
    };
    const onHandleSimonItemClick = async (itemClicked: SimonItem) => {
        try {
            dispatch(Actions.simonItemClicked(itemClicked));
        } catch (e) {
            if (e === 'Finish') {
                await delay(2000);
                dispatch(Actions.generateNewSequence());
                dispatch(Actions.initSequenceDemonstration());
                await demonstrateCurrentSequence();
            }
        }
    };

    if (currentSequenceItemForDemo > -1) {
        delay(2000).then(async () => {
            await demonstrateCurrentSequence();
        });
    }
    const checkItemButtonDisabled = (): boolean => (currentSequenceItemForDemo > -1) || !isGameStarted;
    const currentButtonToShow = (currentSequenceItemForDemo > -1) ?
        gameSequence?.at(currentSequenceItemForDemo) : undefined;

    const [username, setUsername] = useState(''); // State to hold the username input

    const onHandleCloseModal = () => {
        if (username !== '') {
            dispatch(Actions.setUserName(username));
        }
        dispatch(Actions.saveNewScore(lastUserResult));
        navigation.replace('Results');
    };
    return (
        <PageWrapper>
            {(currentSequenceItemForDemo > -1) && <Text>Wait!!!</Text>}
            {(isShowErrorMessage) && <Text>Error!!!!</Text>}
            <Pressable style={[styles.gameItemButton, (currentButtonToShow === 'R' && !isDemoDelay) ?
                styles.itemActive : styles.itemR]}
                       disabled={checkItemButtonDisabled()}
                       onPress={() => onHandleSimonItemClick('R')}><Text>R</Text></Pressable>
            <Pressable style={[styles.gameItemButton, (currentButtonToShow === 'G' && !isDemoDelay) ?
                styles.itemActive : styles.itemG]}
                       disabled={checkItemButtonDisabled()}
                       onPress={() => onHandleSimonItemClick('G')}><Text>G</Text></Pressable>
            <Pressable style={[styles.gameItemButton, (currentButtonToShow === 'Y' && !isDemoDelay) ?
                styles.itemActive : styles.itemY]}
                       disabled={checkItemButtonDisabled()}
                       onPress={() => onHandleSimonItemClick('Y')}><Text>Y</Text></Pressable>
            <Pressable style={[styles.gameItemButton, (currentButtonToShow === 'B' && !isDemoDelay) ?
                styles.itemActive : styles.itemB]}
                       disabled={checkItemButtonDisabled()}
                       onPress={() => onHandleSimonItemClick('B')}><Text>B</Text></Pressable>
            <SGButton title={'Start'} onPress={onHandleStartBtnClick} disabled={isGameStarted}/>
            <SGButton title={'Start demonstration'} onPress={onPressStartDemonstration}/>
            <Text>User name - {userName}</Text>

            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isShowErrorMessage}
                onRequestClose={onHandleCloseModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Game is over. Current sequence length - {lastUserResult}</Text>
                        {/* TextInput for Username */}
                        {(userName === '') && <TextInput
                            style={styles.input}
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername}
                        />}
                        {/* Button to Close Modal */}
                        <SGButton onPress={onHandleCloseModal} title={'Save'}/>
                    </View>
                </View>
            </Modal>
        </PageWrapper>
    );
}


const styles = StyleSheet.create({
    gameItemButton: {
        display: 'flex',
        height: 48,
        width: 48,
        justifyContent: 'center',
        alignItems: 'center',
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
});

export default GamePage;
