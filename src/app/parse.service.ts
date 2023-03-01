import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParseService {

  constructor() { }
  
parseResume(path:any){
const {AffindaCredential, AffindaAPI} = require("@affinda/affinda");
const fs = require("fs");

const credential = new AffindaCredential("c32aa17937068c1bbb18a57fa74477a21132d59c644df4a9273ea077f1870223")
const client = new AffindaAPI(credential)
const readStream = fs.createReadStream(path);

client.createResume({file: readStream}).then((result: any) => {
    console.log("Returned data:");
    console.dir(result)
    return result;
}).catch((err: any) => {
    console.log("An error occurred:");
    console.error(err);
});
}
}
