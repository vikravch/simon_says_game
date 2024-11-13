import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TextInput, View} from 'react-native';
import SGButton from './SGButton.tsx';
import * as Actions from '../redux.ts';
import {useAppDispatch, useAppSelector} from '../../../../general/redux/store.ts';

type Props = {
    onClosed: () => void;
}
function SGResultModal({onClosed}:Props) {
    const dispatch = useAppDispatch();

    const {
        isShowErrorMessage,
        lastUserResult,
        userName,
    } = useAppSelector(store => store.gameReducer);
    const [username, setUsername] = useState(''); // State to hold the username input

    const onHandleCloseModal = () => {
        if (username !== '') {
            dispatch(Actions.setUserName(username));
        }
        dispatch(Actions.saveNewScore(lastUserResult));
        onClosed();
    };
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isShowErrorMessage}
            onRequestClose={onHandleCloseModal}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>Game is over. Current sequence length - {lastUserResult}</Text>
                    {(userName === '') && <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />}
                    <SGButton onPress={onHandleCloseModal} title={'Save'} disabled={(username.length === 0) && (userName.length === 0)}/>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
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
export default SGResultModal;
