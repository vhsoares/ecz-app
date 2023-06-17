/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {navigationRef} from './src/utils/RootNavigation';
import {ThemeProvider} from '@rneui/themed';
import AllScreens from './src/screens/All';
import {NavigationContainer} from '@react-navigation/native';
import * as RootNavigaton from './src/utils/RootNavigation';

import OneSignal from 'react-native-onesignal';

// OneSignal Initialization
OneSignal.setAppId('2c1cac35-43ba-4434-a727-0af0df37bee0');

// promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
// We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
OneSignal.promptForPushNotificationsWithUserResponse();

//Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler(
  notificationReceivedEvent => {
    console.log(
      'OneSignal: notification will show in foreground:',
      notificationReceivedEvent,
    );
    let notification = notificationReceivedEvent.getNotification();
    console.log('notification: ', notification);
    const data = notification.additionalData;
    console.log('additionalData: ', data);
    // Complete with null means don't show a notification.
    notificationReceivedEvent.complete(notification);
  },
);

//Method for handling notifications opened
OneSignal.setNotificationOpenedHandler(({notification}: any) => {
  console.log('OneSignal: notification opened:', notification);

  if (notification && notification?.additionalData) {
    const data = notification.additionalData;
    console.log('additionalData: ', data);

    if (data?.product_id && navigationRef && navigationRef.current) {
      RootNavigaton.navigate('Product', {
        id: data.product_id,
      });
    }
  }
});

function App(): JSX.Element {
  return (
    <ThemeProvider>
      <NavigationContainer ref={navigationRef}>
        <AllScreens />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
