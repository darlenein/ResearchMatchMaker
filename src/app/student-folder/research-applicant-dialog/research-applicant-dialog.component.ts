import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-research-applicant-dialog',
  templateUrl: './research-applicant-dialog.component.html',
  styleUrls: ['./research-applicant-dialog.component.css']
})
export class ResearchApplicantDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ResearchApplicantDialogComponent>) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }
}
