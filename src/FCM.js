import messaging from '@react-native-firebase/messaging';
// import Api from './Api';

export default class FCM {
  static myInstance = null;
  notifyUser: (title, message) => {};

  // /**
  //  * @returns {Api}
  //  */
  static instance() {
    if (FCM.myInstance == null) {
      FCM.myInstance = new FCM();
    }
    return this.myInstance;
  }

  appInit() {
    console.warn("FCM")

    this.checkPermission();
  }

  async checkPermission() {
    console.warn("FCM")

    const authStatus = await messaging().requestPermission();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      this.getToken();
      await this.createNotificationListeners();
    } else {
      this.requestPermission();
    }
  }

  async getToken() {
    console.warn("FCM")
    let fcmToken = '';
    try {
      fcmToken = await messaging().getToken();
    } catch (error) {
      console.error(error);
    }
    // if (fcmToken) {
    //   await Api.instance().updateFcmToken(fcmToken);
    // }
  }

  async requestPermission() {
    try {
      await messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  appDesroyed() {
    console.warn('appDesroyed', 'appDesroyed');
    if (this.notificationListener) {
      this.notificationListener();
      this.notificationOpenedListener();
    }
  }

  async createNotificationListeners() {
    console.warn('createNotificationListeners');
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    // this.notificationListener = messaging()
    //   .onNotification(notification => {
    //     this.onMessage(null, notification._data);
    //   });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = messaging().onNotificationOpenedApp(
      notificationOpen => {
        console.warn("FCM")

        this.onMessage(null, notificationOpen.notification._data);
      },
    );

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await messaging()
      .getInitialNotification();
      console.warn("FCM")

    if (notificationOpen) {
      this.onMessage(null, notificationOpen.notification._data);
    }

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.warn("FCM")

      this.onMessage(null, remoteMessage.notification._data);
    });

    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = messaging().onMessage(async message => {
      console.warn("FCM")

      //process data message
      this.onMessage(null, message);
    });
  }

  onMessage(title, body) {
    console.warn("FCM")

    if (this.notifyUser) {
      this.notifyUser(title, body);
    }
  }
}
