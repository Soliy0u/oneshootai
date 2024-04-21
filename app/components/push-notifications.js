import React, { useEffect, useRef } from 'react';
// import firebase from 'react-native-firebase';
import messaging from '@react-native-firebase/messaging'
import NotificationPopup from 'react-native-push-notification-popup';
import AsyncStorage from '@react-native-community/async-storage';
import { withTheme } from 'react-native-paper';

let notificationListener = null;
let notificationOpenedListener = null;
let messageListener = null;

const PushNotification = (props) => {
  const popup = useRef(null);

  useEffect(() => {
    checkPermission();
    createNotificationListeners();
    // const channel = new notifications.Android.Channel(
    //   'Boilerplate',
    //   'Test Channel',
    //   notifications.Android.Importance.Max,
    // ).setDescription('My apps test channel');

    // // Create the channel
    // notifications().android.createChannel(channel);
    return () => {
      notificationListener();
      notificationOpenedListener();
    };
  }, []);

  const getToken = async () => {
    var fcm_token = await messaging().getToken();
    await AsyncStorage.setItem('@fcm_token', fcm_token);
  };

  const checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    let fcm_token = await AsyncStorage.getItem('@fcm_token');

    if (enabled && !fcm_token) {
      getToken();
    } else {
      requestPermission();
    }
  };

  const requestPermission = async () => {
    try {
      await messaging().requestPermission();
      // User has authorized
      getToken();
    } catch (error) {
      // User has rejected permissions
    }
  };

  const createNotificationListeners = async () => {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    notificationListener = notifications().onNotification((notification) => {
      const { title, body } = notification;
      console.log(title, body);
      const showNotification = new notifications.Notification()
        .setNotificationId(notification._notificationId)
        .setTitle(notification.title)
        .setBody(notification.body)
        .setData(notification.data);
      showNotification.android.setChannelId('iWish');
      notifications().displayNotification(showNotification);
    });
    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    notificationOpenedListener = notifications().onNotificationOpened((notificationOpen) => {
      const { title, body, data } = notificationOpen.notification;
      console.log(title, body, data);
    });
    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body, data } = notificationOpen.notification;
      console.log(title, body, data);
    }
    /*
     * Triggered for data only payload in foreground
     * */
    messageListener = messaging().onMessage((message) => {
      //process data message
      console.log(message);
    });
  };

  return <NotificationPopup ref={popup} />;
};

export default withTheme(PushNotification);
