import React from 'react';
import {StyleSheet, View} from 'react-native';
import SGBoardItem from './SGBoardItem.tsx';
import {simonGameBoardItems} from '../../../../general/types/SimonItem.ts';

function ButtonsGameBoard() {
    return (
        <View style={styles.container} >
            {
                simonGameBoardItems.map((item) => {
                    return <SGBoardItem style={styles.box} key={item} itemValue={item}/>;
                })
            }
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        flexBasis: '45%',
        height: 100,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ButtonsGameBoard;
