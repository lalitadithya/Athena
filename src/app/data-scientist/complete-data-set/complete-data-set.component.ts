import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSet } from './data-set';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { DataSetService } from './data-set.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Element } from '../data-set/data-set';
import { DataSetServiceService } from '../data-set/data-set-service.service';

@Component({
  selector: 'app-complete-data-set',
  templateUrl: './complete-data-set.component.html',
  styleUrls: ['./complete-data-set.component.css'],
  providers: [DataSetService]
})
export class CompleteDataSetComponent implements OnInit {
  displayedColumns = ['name', 'description', 'xComponent', 'yComponent'];
  dataSets: DataSet[];
  dataSource = new MatTableDataSource<DataSet>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private service: DataSetService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.updateData();
  }

  updateData() {
    this.service.get().subscribe((data) => {
      console.log(data);
      this.dataSource = new MatTableDataSource<DataSet>(data);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {

  }

  openDialogForUpload() {
    const dialogRef = this.dialog.open(CompleteDataSetUploadDialog);
    dialogRef.afterClosed().subscribe(result => {
      this.updateData();
    });
  }
}

@Component({
  selector: 'complete-data-set-upload-dialog',
  templateUrl: 'complete-data-set-upload-dialog.html',
  providers: [DataSetServiceService, DataSetService]
})
export class CompleteDataSetUploadDialog {
  createDataSetForm: FormGroup;
  public files: Element[];

  constructor(private fileService: DataSetServiceService, private formBuilder: FormBuilder, private dataSetService: DataSetService, private dialog: MatDialog) {
    this.fileService.get().subscribe((res) => {
      this.files = res;
    });
    this.buildForm();
  }

  buildForm() {
    this.createDataSetForm = this.formBuilder.group({
      Name: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      XComponentId: ['', [Validators.required]],
      YComponentId: ['', [Validators.required]]
    });
  }

  get Name() {
    return this.createDataSetForm.get('Name');
  }

  get Description() {
    return this.createDataSetForm.get('Description');
  }

  get XComponentId() {
    return this.createDataSetForm.get('XComponentId');
  }

  get YComponentId() {
    return this.createDataSetForm.get('YComponentId');
  }

  onSubmit() {
    const val = this.createDataSetForm.getRawValue();
    const seralized = JSON.stringify(val);
    console.log(seralized);
    this.dataSetService.post(seralized).subscribe(response => this.dialog.closeAll());
  }
}
