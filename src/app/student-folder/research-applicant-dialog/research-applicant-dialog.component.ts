import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';

@Component({
  selector: 'app-research-applicant-dialog',
  templateUrl: './research-applicant-dialog.component.html',
  styleUrls: ['./research-applicant-dialog.component.css']
})
export class ResearchApplicantDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ResearchApplicantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public serviceDispatcher: ServiceDispatcher) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

  apply(){
    this.serviceDispatcher.addResearchApplicant(this.data.applicationInfo).subscribe(response => {});
    this.dialogRef.close();
  }
}
