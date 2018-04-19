import { ParameterBase } from "./parameter-base";

export class ParameterText extends ParameterBase<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}