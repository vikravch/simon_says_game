import React from 'react';
import {Score} from '../../domain/model/Score.ts';
import {StyleSheet, Text, View} from 'react-native';
import {formatTime} from '../../../../general/utils/formatTime.ts';

type Props = {
    score: Score
}

function SgScoreItem({score}: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.pointsBox}>{score.score}</Text>
            <Text >{formatTime(score.timestamp).trim()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        gap: 20,
    },
    pointsBox: {
        backgroundColor: '#2196F3',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SgScoreItem;
