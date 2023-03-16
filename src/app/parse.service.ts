import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParseService {

  constructor() { }
  
parseResume(selectfile:any){
const {AffindaCredential, AffindaAPI} = require("@affinda/affinda");
const fs = require("fs");


const credential = new AffindaCredential("fbbf9b7adef358bace64bba12937759c468db3a6")
const client = new AffindaAPI(credential)
const readStream = fetch("sampleResume.pdf")


client.createResume({url:  "https://api.affinda.com/static/sample_resumes/example.pdf"}).then((result: any) => {
    console.log("Returned data:");
    console.dir(result)
    var json = result;
    //this.studentForm.get('firstName')?.setValue(json["first"]);
    console.log(json.profession);
    alert(json["profession"]);
    return result;
}).catch((err: any) => {
    console.log("An error occurred:");
    console.error(err);
});
}
}
