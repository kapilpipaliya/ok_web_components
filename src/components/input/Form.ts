import {
  createFormArray,
  createFormControl, createFormGroup,
  IFormControlOptions,
  IFormGroup
} from "solid-forms";

// Id is used as string because its used as object keys.
export type Id = string;

export type FormToIdMap = Map<string, {id: string}>;

interface BaseField {
  key: string;
  type: string;
  label?: string;
  hidden?: boolean;
  editable?: boolean;
  default?: (formToIdMap: FormToIdMap, formValues: IFormGroup, control: ReturnType<typeof createFormGroup> | ReturnType<typeof createFormArray>, id?: Id) => any;
  options?: IFormControlOptions;
  onchange?: (form: IFormGroup, value: Id)=>void
}

export interface SelectField extends BaseField {
  collection: string;
  valueKey: string;
  fetchOptions: (formToIdMap: FormToIdMap, formValues: IFormGroup, formGroup: IFormGroup, inputValue: string) => Promise<any[]>;
}

export interface TableFieldAttributeBase {
  noOverWrite?: boolean;
}
export type TableFieldAttributes = (BaseField & TableFieldAttributeBase) | (SelectField & TableFieldAttributeBase) | (TableField & TableFieldAttributeBase)
export interface TableField extends BaseField {
  collection?: string;
  edge?: string;
  attributes: TableFieldAttributes[];
  defaultValue: "undefined" | 'default';
  data: {properties: {}}[]; // Edges[]
  defaultValueFn: (control: IFormGroup, key: string)=>string;
  save: (results: FormToIdMap, tableData: any[]) => any;

}
export type FieldAttribute = BaseField | SelectField | TableField

export interface FormMetaData {
  id: Id;
  title: string;
  attributes: FieldAttribute[];
  save: ["vertex", string]
      | ['edge', string, ((results: FormToIdMap, formValue: object)=> Id) | undefined, ((results: FormToIdMap, formValue: object)=> Id) | undefined]
      // if start and end function are not provided than it will not save anything
      | ['edge', string]
  data?: (idMap: FormToIdMap) => any
  idFn?: (idMap: FormToIdMap)=>Id;
}