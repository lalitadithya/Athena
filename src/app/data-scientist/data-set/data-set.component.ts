import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';

@Component({
  selector: 'app-data-set',
  templateUrl: './data-set.component.html',
  styleUrls: ['./data-set.component.css']
})
export class DataSetComponent implements OnInit {
  displayedColumns = ['Name', 'Description', 'CreatedDate'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog) { 
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openDialogForUpload() {
    const dialogRef = this.dialog.open(DataSetUploadDialog, {
      width: '400px'
    });
  }

  ngOnInit() {
  }
}

export interface Element {
  Name: string, 
  Description: string,
  CreatedDate: string
}

const ELEMENT_DATA: Element[] = [
  {Name: 'DS1', Description: 'Data set 1', CreatedDate: 'date 1'},
  {Name: 'DS2', Description: 'Data set 2', CreatedDate: 'date 1'},
  {Name: 'DS3', Description: 'Data set 3', CreatedDate: 'date 1'},
  {Name: 'DS4', Description: 'Data set 4', CreatedDate: 'date 1'},
  {Name: 'DS5', Description: 'Data set 5', CreatedDate: 'date 1'},
  {Name: 'DS6', Description: 'Data set 6', CreatedDate: 'date 1'},
  {Name: 'DS7', Description: 'Data set 7', CreatedDate: 'date 1'},
  {Name: 'DS8', Description: 'Data set 8', CreatedDate: 'date 1'},
  {Name: 'DS9', Description: 'Data set 9', CreatedDate: 'date 1'},
  {Name: 'DS10', Description: 'Data set 10', CreatedDate: 'date 1'},
];

@Component({
  selector: 'data-set-upload-dialog',
  templateUrl: 'data-set-upload-dialog.html',
})
export class DataSetUploadDialog {
  uploadDataSetForm: FormGroup;
  dataSetToUpload: File;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, public dialog: MatDialog) { 
    this.buildForm();
  }

  buildForm() {
    this.uploadDataSetForm = this.formBuilder.group({
      name: [''],
      description: [''],
      file: ['']
    });
  }

  handleFileInput(files: FileList) {
    this.dataSetToUpload = files.item(0);
  }

  onSubmit() {
    console.log(this.dataSetToUpload);
    const formData: FormData = new FormData();
    formData.append('fileKey', this.dataSetToUpload, this.dataSetToUpload.name);
    formData.set('Name', this.uploadDataSetForm.get('name').value);
    formData.set('Description', this.uploadDataSetForm.get('description').value);

    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    const req = new HttpRequest('POST', "http://localhost:57294/api/DataSets", formData, {
      reportProgress: true,
      headers: headers
    });
    this.httpClient.request(req).subscribe(event => {
      if(event.type == HttpEventType.UploadProgress) {
        console.log(Math.round(100 * event.loaded / event.total));
      } else if(event instanceof HttpResponse) {
        console.log(event.body);
        console.log("Upload success");
      }
    }, err => {
      console.log("error");
      console.log(err);
    });
  }

  get name() {
    return this.uploadDataSetForm.get('name');
  }

  get description() {
    return this.uploadDataSetForm.get('description');
  }

  get file() {
    return this.uploadDataSetForm.get('file');
  }
}