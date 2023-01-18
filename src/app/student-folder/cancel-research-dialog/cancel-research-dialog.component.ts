import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProgressModel } from 'src/app/models/progress.model';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';

@Component({
  selector: 'app-cancel-research-dialog',
  templateUrl: './cancel-research-dialog.component.html',
  styleUrls: ['./cancel-research-dialog.component.css']
})
export class CancelResearchDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CancelResearchDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public serviceDispatcher: ServiceDispatcher
    ) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

  cancel(){
    debugger;
    this.serviceDispatcher.deleteResearchApplicant(this.data.applicationInfo).subscribe(response => {});
    this.dialogRef.close();
  }
}
