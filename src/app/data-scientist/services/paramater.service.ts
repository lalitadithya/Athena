import { Injectable } from '@angular/core';
import { ParameterBase } from '../dashboard/parameter-base';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ParameterText } from '../dashboard/parameter-text-input';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ParameterNumber } from '../dashboard/parameter-number-input';

@Injectable()
export class ParamaterService {
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  toFormGroup(parameters: ParameterBase<any>[]) {
    let group: any = {};

    parameters.forEach(parameter => {
      switch (parameter.controlType) {
        case "string":
          group[parameter.key] = new FormControl('', Validators.required);
          break;
        case "number":
          console.log("Asd");
          group[parameter.key] = new FormControl(0, [Validators.required, Validators.pattern(/^[-+]?[0-9]*\.?[0-9]+$/)]);
          break;
      }
    })

    return new FormGroup(group);
  }

  getParameters(id) {
    let promise = this.http.get('http://localhost:57294/api/AlgorithmParamertes/' + id, {
      headers: this.headers
    }).toPromise()
      .then(results => {
        let parameters: ParameterBase<any>[] = [];
        console.log(results);
        for (var i in results) {
          console.log(results[i]);
          switch (results[i].dataType) {
            case "number":
              parameters.push(new ParameterNumber({
                key: results[i].id,
                label: results[i].description,
                value: 0,
                required: true,
                order: i
              }));
              break;
            case "string":
              parameters.push(new ParameterText({
                key: results[i].id,
                label: results[i].description,
                value: '',
                required: true,
                order: i
              }));
              break;
          }
        }
        return parameters.sort((a, b) => a.order - b.order);
      });
    return promise;
  }
}
