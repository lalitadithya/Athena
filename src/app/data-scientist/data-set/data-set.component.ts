import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { DataSetServiceService } from './data-set-service.service';
import { Element } from './data-set';

@Component({
  selector: 'app-data-set',
  templateUrl: './data-set.component.html',
  styleUrls: ['./data-set.component.css'],
  providers: [DataSetServiceService]
})
export class DataSetComponent implements OnInit {
  displayedColumns = ['name', 'description'];
  ELEMENT_DATA: Element[];
  dataSource = new MatTableDataSource<Element>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private service: DataSetServiceService) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.updateData();
  }

  updateData() {
    this.service.get().subscribe((res) => {
      this.ELEMENT_DATA = res;
      this.dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
    });
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
    dialogRef.afterClosed().subscribe(result => {
      this.updateData();
    });
  }

  ngOnInit() {
  }
}

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

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const req = new HttpRequest('POST', 'http://athena.a2hosted.com/api/DataSets', formData, {
      reportProgress: true,
      headers: headers
    });
    this.httpClient.request(req).subscribe(event => {
      if (event.type == HttpEventType.UploadProgress) {
        console.log(Math.round(100 * event.loaded / event.total));
      } else if (event instanceof HttpResponse) {
        console.log(event.body);
        console.log('Upload success');
        this.dialog.closeAll();
      }
    }, err => {
      console.log('error');
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
