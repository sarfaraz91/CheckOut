import firebase from 'react-native-firebase';

export default class FCM {

    static myInstance = null;


    /**
   * @returns {Api}
   */

  static instance() {
    if (FCM.myInstance == null) {
      FCM.myInstance = new FCM();
    }
    return this.myInstance;
  }
  appInit() {
    this.checkPermission();
}

async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        this.getToken();
        await this.createNotificationListeners();
    } else {
        this.requestPermission();
    }
    }

    
async getToken() {
    let fcmToken = '';
    try {
        fcmToken = await firebase.messaging().getToken();
      } catch (error) {
        console.error(error);
    }
       if (fcmToken) {
            await Api.instance().updateFcmToken(fcmToken);
        }   
  
}
}