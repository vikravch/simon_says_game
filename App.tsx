/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import GamePage from './features/game/presentation/pages/GamePage.tsx';
import ResultsPage from './features/game/presentation/pages/ResultsPage.tsx';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//import {CollectionUserDataRepository} from './features/game/data/fake/CollectionUserDataRepository.ts';
import {generateSequence} from './features/game/domain/use_cases/generateNewSequence.ts';
import {testCurrentSequence} from './features/game/domain/use_cases/testCurrentSequence.ts';
import {getUserData} from './features/game/domain/use_cases/getUserData.ts';
import {saveUserResult} from './features/game/domain/use_cases/saveUserResult.ts';
import {saveUserName} from './features/game/domain/use_cases/saveUserName.ts';
import {AsyncStorageUserDataRepository} from './features/game/data/preferences/AsyncStorageUserDataRepository.ts';

const Stack = createNativeStackNavigator();

export const userDataRepository = new AsyncStorageUserDataRepository();
export const useCases = {
    generateSequence,
    testCurrentSequence,
    getUserData: getUserData(userDataRepository),
    saveUserResult: saveUserResult(userDataRepository),
    saveUserName: saveUserName(userDataRepository),
};

function App(): React.JSX.Element {
  return (
      <NavigationContainer>
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={GamePage} />
          <Stack.Screen name="Results" component={ResultsPage} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export function PageWrapper(props: PropsWithChildren<{}>): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}>
          <View
              style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
              }}>
            {props.children}
          </View>
        </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
