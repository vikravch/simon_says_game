import React from 'react';
import {StyleSheet, View} from 'react-native';
import SGBoardItem from './SGBoardItem.tsx';
import {simonGameBoardItems, SimonItem} from '../../../../general/types/SimonItem.ts';

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
        flexDirection: 'row',      // Lay out items in a row
        flexWrap: 'wrap',           // Allow items to wrap to the next line
        justifyContent: 'center',   // Center items horizontally
        alignItems: 'center',       // Center items vertically
    },
    box: {
        flexBasis: '45%',           // Each box takes up about half of the row width
        height: 100,                // Set a fixed height
        margin: 5,                  // Add spacing around boxes
        justifyContent: 'center',   // Center text within each box
        alignItems: 'center',       // Center text within each box
    },
});

export default ButtonsGameBoard;
