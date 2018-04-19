import { Component, OnInit, Input } from '@angular/core';
import { ParameterBase } from '../parameter-base';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-paramater',
  templateUrl: './paramater.component.html',
  styleUrls: ['./paramater.component.css']
})
export class ParamaterComponent implements OnInit {

  @Input() parameter: ParameterBase<any>;
  @Input() form: FormGroup;
  constructor() { }

  ngOnInit() {
  }

  get control() {
    return this.form.controls[this.parameter.key];
  }

}
