import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {PageWrapper} from '../../../../App.tsx';
import SGButton from '../components/SGButton.tsx';
import {useAppSelector} from '../../../../general/redux/store.ts';
import SGScoreItem from '../components/SGScoreItem.tsx';

function ResultsPage({ navigation }: any) {
    const {
        userName,
        scoreList,
    } = useAppSelector(store => store.gameReducer);

    return (
        <PageWrapper>
            <View >
                <Text style={styles.h1}>{userName} your best results:</Text>
                <FlatList
                    data={scoreList.slice(-10).sort((a, b) => b.score - a.score)}
                    renderItem={({item}) => <SGScoreItem score={item}/>}
                    keyExtractor={(item) => item.timestamp}/>

                <View style={styles.buttonsSection} >
                <SGButton
                    title="Start new game"
                    onPress={() => navigation.replace('Home')}/>
                </View>
            </View>

        </PageWrapper>
    );
}


const styles = StyleSheet.create({
    h1: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    buttonsSection: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
});

export default ResultsPage;
