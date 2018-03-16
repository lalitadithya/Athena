import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openProfileDialog() : void {
    let dialogRef = this.dialog.open(ProfileUploadProfileDialog, {
      width: '512px'
    });
  }

  openHeaderDialog(): void {
    let dialogRef = this.dialog.open(ProfileUploadHeaderDialog, {
      width: '512px'
    });
  }

}

@Component({
  selector: 'profile-upload-profile-dialog',
  templateUrl: 'profile-upload-profile-dialog.html'
})
export class ProfileUploadProfileDialog {

  constructor(
    public dialogRef: MatDialogRef<ProfileUploadProfileDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onUploadClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'profile-upload-header-dialog',
  templateUrl: 'profile-upload-header-dialog.html'
})
export class ProfileUploadHeaderDialog {

  constructor(
    public dialogRef: MatDialogRef<ProfileUploadHeaderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onUploadClick(): void {
    this.dialogRef.close();
  }
}