// import axios from 'axios';
// // import https from 'https';
// import AsyncStorage from '@react-native-community/async-storage';
// import { Configs, Roles, AppointmentStatus } from './Configs';
// import * as AxiosLogger from 'axios-logger';

// export default class Api {
//   static myInstance = null;
//   client;
//   _userRole;

//   constructor() {
//     // At instance level
//     this.client = axios.create({});
//     this.client.interceptors.request.use(AxiosLogger.requestLogger);
//     this.client.interceptors.response.use(AxiosLogger.responseLogger);
//   }

//   /**
//    * @returns {Api}
//    */
//   static instance() {
//     if (Api.myInstance == null) {
//       Api.myInstance = new Api();
//     }
//     return this.myInstance;
//   }

//   async login(email: string, password: string) {
//     let response = await this.client.post(
//       this.getUrl('Clients/login?include=user'),
//       { email, password },
//       this.getHeaders(),
//     );
//     let authData = response.data;
//     if (authData.error) throw authData.error.message;
//     await this.saveUser(authData.user);


//     //update fcm
//     try {
//       await this.updateFcmToken(await AsyncStorage.getItem('fcmToken'))
//     } catch (error) {

//       //log error, to enable ease in debugging
//       console.log(error);
//     }
//     return response.data;
//   }

//   async saveUser(user) {
//     try {
//       await AsyncStorage.setItem('@user', JSON.stringify(user));
//     } catch (e) {
//       console.warn(e);
//     }
//   }


//   async _user() {
//     try {
//       return JSON.parse(await AsyncStorage.getItem('@user'));

//     } catch (e) {
//       console.warn(e);
//     }
//   }


//   getUrl(endpoint) {
//     return `${Configs.baseUrl}${endpoint}`;
//   }

//   getHeaders() {
//     return {
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//       },
//     };
//   }
// }