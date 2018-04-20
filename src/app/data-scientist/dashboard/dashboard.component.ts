import { Component, OnInit, Inject } from '@angular/core';
import { Execution } from '../models/execution';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Algorithm } from '../models/algorithm';
import { AlgorithmService } from '../services/algorithm.service';
import { ParamaterService } from '../services/paramater.service';
import { ParameterBase } from './parameter-base';
import { PipelineService } from '../services/pipeline.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  executions: Execution[] = [
    { id: '1', name: 'Regression', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare turpis mattis tellus sodales posuere. Mauris ac nunc dictum, tincidunt erat in, commodo nisi.', status: 'Running', image: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { id: '2', name: 'Neural Network', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare turpis mattis tellus sodales posuere. Mauris ac nunc dictum, tincidunt erat in, commodo nisi.', status: 'Running', image: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { id: '3', name: 'Clustering', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare turpis mattis tellus sodales posuere. Mauris ac nunc dictum, tincidunt erat in, commodo nisi.', status: 'Running', image: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { id: '4', name: 'Classification', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare turpis mattis tellus sodales posuere. Mauris ac nunc dictum, tincidunt erat in, commodo nisi.', status: 'Running', image: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { id: '5', name: 'Recommendation', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare turpis mattis tellus sodales posuere. Mauris ac nunc dictum, tincidunt erat in, commodo nisi.', status: 'Running', image: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { id: '6', name: 'Reinforcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare turpis mattis tellus sodales posuere. Mauris ac nunc dictum, tincidunt erat in, commodo nisi.', status: 'Running', image: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { id: '7', name: 'Anomaly detection', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare turpis mattis tellus sodales posuere. Mauris ac nunc dictum, tincidunt erat in, commodo nisi.', status: 'Running', image: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { id: '8', name: 'Density estimation', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare turpis mattis tellus sodales posuere. Mauris ac nunc dictum, tincidunt erat in, commodo nisi.', status: 'Running', image: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { id: '9', name: 'Regression', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare turpis mattis tellus sodales posuere. Mauris ac nunc dictum, tincidunt erat in, commodo nisi.', status: 'Running', image: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { id: '10', name: 'Neural Network', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare turpis mattis tellus sodales posuere. Mauris ac nunc dictum, tincidunt erat in, commodo nisi.', status: 'Running', image: 'https://material.angular.io/assets/img/examples/shiba2.jpg' }
  ];

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openLogDialog(id): void {
    console.log(id);
    const dialogRef = this.dialog.open(DashboardLogDialog, {
      width: '1024px',
      data: { id: id }
    });
  }

  addPipeline() {
    const dialogRef = this.dialog.open(DashboardAddPipelineDialog);
  }
}

@Component({
  selector: 'dashboard-log-dialog',
  templateUrl: 'dashboard-log-dialog.html'
})
export class DashboardLogDialog {

  constructor(
    public dialogRef: MatDialogRef<DashboardLogDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dashboard-add-pipeline-dialog',
  templateUrl: 'dashboard-add-pipeline-dialog.html',
  providers: [AlgorithmService, ParamaterService, PipelineService]
})
export class DashboardAddPipelineDialog {
  algorithmSelectionFormGroup: FormGroup;
  parameterFormGroup: FormGroup;
  customizationFormGroup: FormGroup;
  container = 0;
  algorithms: Algorithm[];
  parameters: ParameterBase<any>[] = [];

  constructor(private formBuilder: FormBuilder,
    private algorithmService: AlgorithmService,
    private parameterService: ParamaterService,
    private pipelineService: PipelineService,
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
    this.algorithmSelectionFormGroup = this.formBuilder.group({
      alogrithm: ['', Validators.required]
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
    console.log("Asd");
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
        Description: this.description.value
      };
      console.log("my data = " + data);
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
}
