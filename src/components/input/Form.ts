import {
  createFormArray,
  createFormControl,
  IFormControlOptions,
  IFormGroup
} from "solid-forms";

// Id is used as string because its used as object keys.
export type Id = string;

interface BaseField {
  key: string;
  type: string;
  label?: string;
  hidden?: boolean;
  editable?: boolean;
  default?: (control: ReturnType<typeof createFormControl> | ReturnType<typeof createFormArray>, id?: Id) => any;
  options?: IFormControlOptions;
  onchange?: (form: IFormGroup, value: Id)=>void
}

export interface SelectField extends BaseField {
  collection: string;
  valueKey: string;
  fetchOptions: (formGroup: IFormGroup, inputValue: string) => Promise<any[]>;
}
export interface TableField extends BaseField {
  collection?: string;
  edge?: string;
  attributes: FieldAttribute[];
  defaultValue: "undefined" | 'default';
  data: {properties: {}}[]; // Edges[]
  defaultValueFn: (control: IFormGroup, key: string)=>string;
}
export type FieldAttribute = BaseField | SelectField | TableField

export interface FormMetaData {
  id: Id;
  title: string;
  attributes: FieldAttribute[];
  save: ["vertex", string] | ['edge', string, ((results: {[key: string]: any}, formValue: object)=> Id) | undefined, ((results: {[key: string]: any}, formValue: object)=> Id) | undefined];
  data?: (idMap: Map<string, string>) => any
  idFn?: (idMap: Map<string, string>)=>Id;
}