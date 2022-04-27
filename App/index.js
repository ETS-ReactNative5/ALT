/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {typography} from './Utils/typography';

typography();

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  console.log('Authorization status:', authStatus);
}

requestUserPermission();

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
