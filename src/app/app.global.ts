import { Injectable } from '@angular/core';
import { Stitch, RemoteMongoClient } from 'mongodb-stitch-browser-sdk'

@Injectable()
export class AppGlobals {
public APP_ID='obvia-app-fczvz'

public app = Stitch.hasAppClient(this.APP_ID)
  ? Stitch.getAppClient(this.APP_ID)
  : Stitch.initializeAppClient(this.APP_ID);

public mongoClient=this.app.getServiceClient(RemoteMongoClient.factory,"mongodb-atlas")  

}