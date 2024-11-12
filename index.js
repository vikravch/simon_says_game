/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store} from './general/redux/store';
import { enableScreens } from 'react-native-screens';
enableScreens();
function Index() {
    return (
        <Provider store={store} >
            <App />
        </Provider>
    );
}


AppRegistry.registerComponent(appName, () => Index);
