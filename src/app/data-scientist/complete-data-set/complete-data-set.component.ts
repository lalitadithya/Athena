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
    this.dataSource = new MatTableDataSource<DataSet>(this.service.get());
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {

  }

  openDialogForUpload() {
    this.dialog.open(CompleteDataSetUploadDialog);
  }
}

@Component({
  selector: 'complete-data-set-upload-dialog',
  templateUrl: 'complete-data-set-upload-dialog.html',
  providers: [DataSetServiceService]
})
export class CompleteDataSetUploadDialog {
  createDataSetForm: FormGroup;
  public files: Element[];

  constructor(private fileService: DataSetServiceService, private formBuilder: FormBuilder) {
    this.fileService.get().subscribe((res) => {
      this.files = res;
      console.log(this.files);
    });
    this.buildForm();
  }

  buildForm() {
    this.createDataSetForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      xComponent: ['', [Validators.required]],
      yComponent: ['', [Validators.required]]
    });
  }

  get name() {
    return this.createDataSetForm.get('name');
  }

  get description() {
    return this.createDataSetForm.get('description');
  }

  get xComponent() {
    return this.createDataSetForm.get('xComponent');
  }

  get yComponent() {
    return this.createDataSetForm.get('yComponent');
  }
}
