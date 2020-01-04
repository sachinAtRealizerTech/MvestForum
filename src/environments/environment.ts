// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  name: 'dev',

  //development
  //APIBASEURL: 'http://45.35.4.250:4001'
  //APIBASEURL: 'http://45.35.4.250:4002'
  APIBASEURL: 'http://45.35.4.250:5001',
  APIBASEIMGURL: 'http://45.35.4.250:3000',
  IMAGEPREPENDURL: 'http://45.35.4.250/MvestUploadContainer/',
  BaseUrlChatServer: 'http://45.35.4.250:3021'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
