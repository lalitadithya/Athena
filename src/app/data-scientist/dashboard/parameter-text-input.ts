import { ParameterBase } from './parameter-base';

export class ParameterText extends ParameterBase<string> {
  controlType = 'string';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
