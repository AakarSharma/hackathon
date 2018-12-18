import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2'; // using angular2 for firebase
import { AngularFireAuthModule } from 'angularfire2/auth';  // importing auth moduleof angularfire2
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {AngularFireStorageModule} from 'angularfire2/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

var firebaseAuth = {
  apiKey: "AIzaSyACWvceKT1lF9iD6i2ZDFHax34cHkco2ic",
  authDomain: "hackathon-25199.firebaseapp.com",
  databaseURL: "https://hackathon-25199.firebaseio.com",
  projectId: "hackathon-25199",
  storageBucket: "hackathon-25199.appspot.com",
  messagingSenderId: "428018245124"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),  // app initilise with the firebase key
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
