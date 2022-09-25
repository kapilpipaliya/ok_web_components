import {
  createFormArray,
  createFormControl, createFormGroup,
  IFormControlOptions,
  IFormGroup
} from "solid-forms";
import {JSX} from "solid-js";

// Id is used as string because its used as object keys.
export type Id = string;

export type FormResult = Map<string, {[key: string]: any}>;

export interface InitialValues {
  [formId: string]: {id: Id, start?: Id, end?: Id, properties: {[key: string]: any}}
}

interface BaseField {
  key: string;
  type: string;
  label?: string;
  hidden?: boolean;
  editable?: boolean;
  default?: (formValues: IFormGroup, control: ReturnType<typeof createFormGroup> | ReturnType<typeof createFormArray>, id?: Id) => any;
  options?: IFormControlOptions;
  onchange?: (form: IFormGroup, value: Id)=>void
}

export interface SelectField extends BaseField {
  type: 'select';
  collection: string;
  valueKey: string;
  fetchOptions: (formValues: IFormGroup, formGroup: IFormGroup, inputValue: string) => Promise<any[]>;
}

export interface TableFieldAttributeBase {
  noOverWrite?: boolean;
}
export type TableFieldAttributes = (BaseField & TableFieldAttributeBase) | (SelectField & TableFieldAttributeBase) | (TableField & TableFieldAttributeBase)

export interface TableField extends BaseField {
  type: "table" | "table_forms";
  collection?: string;
  edge?: string;
  form?: string;
  postSubmit?: (formValues: IFormGroup, formGroup: IFormGroup, tableItemFormGroup: IFormGroup, values: FormResult)=>void
  attributes: TableFieldAttributes[];
  defaultValue: "undefined" | 'default';
  data: {properties: {}}[]; // Edges[]
  defaultValueFn: (control: IFormGroup, key: string)=>string;
  save: (results: FormResult, tableData: any[]) => any;

}
// - if label is "save" and we don't pass a onclick function, it runs a default save function.
// - the save button should be disabled until anything changed.
export interface ButtonItem {
  design: "Default" | "Transparent" | "Positive" | "Negative" | "Attention" | "Emphasized";
  onclick: () => void;
  children?: JSX.Element;
}
export interface ButtonGroupField extends BaseField {
  type: "buttongroup";
  buttons: ButtonItem[]
}
export type FieldAttribute = BaseField | SelectField | TableField | ButtonGroupField

export interface FormMetaData {
  id: Id;
  title: string;
  attributes: FieldAttribute[];
  save: ["vertex", string]
      // we can pass initialValues to start and end function when needed
      | ['edge', string, ((results: FormResult, formValue: object)=> Id) | undefined, ((results: FormResult, formValue: object)=> Id) | undefined]
      // if start and end function are not provided than it will not save anything
      | ['edge', string]
  // when there is more than one forms we provide data fn for each form
  data?: (id: string) => any
}
