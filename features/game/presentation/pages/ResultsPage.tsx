import React from 'react';
import {Text} from 'react-native';
import {PageWrapper} from '../../../../App.tsx';
import SGButton from '../components/SGButton.tsx';
import {useAppSelector} from '../../../../general/redux/store.ts';

function ResultsPage({ navigation }: any) {
    const {
        userName,
        scoreList,
    } = useAppSelector(store => store);

    return (
        <PageWrapper>
            <Text>{userName} your results:</Text>
            <Text>{JSON.stringify(scoreList)}</Text>

            <SGButton
                title="Start new game"
                onPress={() => navigation.replace('Home')}/>
        </PageWrapper>
    );
}

export default ResultsPage;
