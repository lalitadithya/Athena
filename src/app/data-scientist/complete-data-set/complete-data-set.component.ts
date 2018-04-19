import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSet } from './data-set';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { DataSetService } from './data-set.service';

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
})
export class CompleteDataSetUploadDialog {

}