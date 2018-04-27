import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Execution } from '../models/execution';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Algorithm } from '../models/algorithm';
import { AlgorithmService } from '../services/algorithm.service';
import { ParamaterService } from '../services/paramater.service';
import { ParameterBase } from './parameter-base';
import { PipelineService } from '../services/pipeline.service';
import { Pipeline } from '../models/pipeline';
import { PipelineParameters } from '../models/pipeline-parameters';
import { HubConnection } from '@aspnet/signalr';
import { DomSanitizer } from '@angular/platform-browser';
import { DataSet } from '../complete-data-set/data-set';
import { DataSetService } from '../complete-data-set/data-set.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [PipelineService]
})
export class DashboardComponent implements OnInit {
  pipelines: Pipeline[];

  constructor(public dialog: MatDialog,
    private pipelineService: PipelineService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.pipelineService.get().subscribe((data) => {
      this.pipelines = data;
    });
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  openLogDialog(id): void {
    const dialogRef = this.dialog.open(DashboardLogDialog, {
      width: '1024px',
      data: this.pipelines.find(x => x.id == id)
    });
  }

  openViewDialog(id): void {
    const dialogRef = this.dialog.open(DashboardViewDialog, {
      width: '1024px',
      data: this.pipelines.find(x => x.id == id)
    });
  }

  addPipeline() {
    const dialogRef = this.dialog.open(DashboardAddPipelineDialog);
  }
}

@Component({
  selector: 'dashboard-view-dialog',
  templateUrl: 'dashboard-view-dialog.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardViewDialog {
  displayedColumns = ['parameterName', 'parameterDescription', 'value'];
  dataSource: MatTableDataSource<PipelineParameters>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DashboardViewDialog>,
    @Inject(MAT_DIALOG_DATA) public pipeline: Pipeline) {
    this.dataSource = new MatTableDataSource(pipeline.parameters);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dashboard-log-dialog',
  templateUrl: 'dashboard-log-dialog.html'
})
export class DashboardLogDialog implements OnInit {
  private hubConnection: HubConnection;
  public logs: String = "";

  constructor(
    public dialogRef: MatDialogRef<DashboardLogDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Pipeline) {
  }

  ngOnInit() {
    this.hubConnection = new HubConnection('http://athena.a2hosted.com/loghub');
    this.hubConnection.on('Log', (data: any) => {
      this.logs += data;
    });
    this.hubConnection.start().then(() => {
      console.log("Connection started");
      this.hubConnection.invoke('StartTransmission', this.data.id);
    }).catch(() => {
      console.log("Error occured");
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dashboard-add-pipeline-dialog',
  templateUrl: 'dashboard-add-pipeline-dialog.html',
  providers: [AlgorithmService, ParamaterService, PipelineService, DataSetService]
})
export class DashboardAddPipelineDialog {
  algorithmSelectionFormGroup: FormGroup;
  parameterFormGroup: FormGroup;
  customizationFormGroup: FormGroup;
  container = 0;
  algorithms: Algorithm[];
  datasets: DataSet[];
  parameters: ParameterBase<any>[] = [];
  selected: string;

  constructor(private formBuilder: FormBuilder,
    private algorithmService: AlgorithmService,
    private parameterService: ParamaterService,
    private pipelineService: PipelineService,
    private datasetService: DataSetService,
    private dialogRef: MatDialog) { }

  ngOnInit() {
    this.parameterFormGroup = new FormGroup({});
    this.customizationFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.algorithmService.get().subscribe((res) => {
      this.algorithms = res;
    });
    this.datasetService.get().subscribe((res) => {
      this.datasets = res;
    })
    this.algorithmSelectionFormGroup = this.formBuilder.group({
      alogrithm: ['', Validators.required],
      dataset: ['', Validators.required]
    });
    this.parameterFormGroup = this.formBuilder.group({
      containers: [0, [Validators.required, Validators.min(1), Validators.max(100)]]
    });
  }

  stepperSelectionChanged(event) {
    if (event.previouslySelectedIndex == 0 && event.selectedIndex == 1) {
      this.parameterService.getParameters(this.alogrithm.value.id).then(result => {
        this.parameters = result;
        this.parameterFormGroup = this.parameterService.toFormGroup(this.parameters);
      });
    }
  }

  begin() {
    if (!this.customizationFormGroup.invalid) {
      const parameters = [];
      for (const key in this.parameterFormGroup.value) {
        const value = this.parameterFormGroup.value[key];
        parameters.push({
          id: key,
          value: value
        });
      }
      const data = {
        AlgorithmId: this.alogrithm.value.id,
        Parameters: parameters,
        NumberOfContainers: this.container,
        Name: this.name.value,
        Description: this.description.value,
        DataSetId: this.dataset.value.id
      };
      this.pipelineService.post(data).subscribe(res => {
        this.dialogRef.closeAll();
      });
    }
  }

  get alogrithm() {
    return this.algorithmSelectionFormGroup.get('alogrithm');
  }

  get name() {
    return this.customizationFormGroup.get('name');
  }

  get description() {
    return this.customizationFormGroup.get('description');
  }

  get dataset() {
    return this.algorithmSelectionFormGroup.get('dataset');
  }
}
