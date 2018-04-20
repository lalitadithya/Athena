import { ParameterBase } from './parameter-base';

export class ParameterNumber extends ParameterBase<number> {
  controlType = 'number';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || 1;
  }
}
