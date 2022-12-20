import {
  createFormArray,
  createFormControl, createFormGroup,
  IFormControlOptions,
  IFormGroup
} from "solid-forms";
import {JSX, JSXElement} from "solid-js";

// Id is used as string because its used as object keys.
export type Id = string;

export type FormResult = Map<string, {[key: string]: any}>;

export interface InitialValues {
  [formId: string]: {id: Id, start?: Id, end?: Id, properties: {[key: string]: any}}
}
export enum ServerFormAttributeType {
  String= "string",
  Dynamic= "dynamic",
  Boolean= "boolean",
  Integer= "integer",
  Decimal= "decimal",
  Object= "object",
  Table= "table",
  TableForm= "table_forms",
  Select= "select",
  ButtonGroup= "buttongroup",
  JsCode= "jscode",
}

interface BaseField {
  id: string;
  type: ServerFormAttributeType;
  label?: string;
  hidden?: boolean;
  readonly ?: boolean;
  required?: boolean;
  disabled?: boolean;
  default?: (formValues: IFormGroup, control: ReturnType<typeof createFormGroup> | ReturnType<typeof createFormArray>, id?: Id) => any;
  fieldOptions?: IFormControlOptions;
  onchange?: (form: IFormGroup, value: Id)=>void
  props?: {[key: string]: any}
}

export interface SelectField extends BaseField {
  type: ServerFormAttributeType.Select;
  collection: string;
  valueKey: string;
  fetchOptions: (formValues: IFormGroup, formGroup: IFormGroup, inputValue: string) => Promise<any[]>;
}

export interface TableFieldAttributeBase {
  noOverWrite?: boolean;
  noInput?: boolean;
}
export type TableFieldAttributes = (BaseField & TableFieldAttributeBase) | (SelectField & TableFieldAttributeBase) | (TableField & TableFieldAttributeBase)

export interface TableField extends BaseField {
  type: ServerFormAttributeType.Table | ServerFormAttributeType.TableForm;
  collection?: string;
  edge?: string;
  form?: string;
  postSubmit?: (formValues: IFormGroup, formGroup: IFormGroup, tableItemFormGroup: IFormGroup, values: FormResult)=>void
  attributes: TableFieldAttributes[];
  defaultValue: "undefined" | 'default';
  data: {properties: {}}[]; // Edges[]
  defaultValueFn: (control: IFormGroup, key: string)=>JSXElement;
  save: (txnId: number, results: FormResult, tableData: any[]) => any;
  noSort?: boolean;
}
// - if label is "save" and we don't pass a onclick function, it runs a default save function.
// - the save button should be disabled until anything changed.
export interface ButtonItem {
  design: "Default" | "Transparent" | "Positive" | "Negative" | "Attention" | "Emphasized";
  onclick: () => void;
  children?: JSX.Element;
}
export interface ButtonGroupField extends BaseField {
  type: ServerFormAttributeType.ButtonGroup;
  buttons: ButtonItem[]
}
export type FieldAttribute = BaseField | SelectField | TableField | ButtonGroupField

export interface FormMetaData {
  id: Id;
  title: string;
  attributes: FieldAttribute[];
  save: ["vertex", VertexLabels]
      // we can pass initialValues to start and end function when needed
      | ['edge', EdgeLabels, ((results: FormResult, formValue: object)=> Id) | undefined, ((results: FormResult, formValue: object)=> Id) | undefined]
      // if start and end function are not provided than it will not save anything
      | ['edge', EdgeLabels]
  // when there is more than one forms we provide data fn for each form
  data?: (id: string) => any
}


// ********
// Types
// ********

export interface Vertex {
  id: Id;
  labels: string[];
  properties: {[key: string]: any},
  in_edges: {[key: string]: Id[]},
  out_edges: {[key: string]: Id[]}
}

export interface Edge {
  id: Id;
  properties: {[key: string]: any},
  type: string;
  start: Id;
  end: Id;
}

export enum VertexLabels {
  // Base
  ServerAttributeType = "ServerAttributeType", // all type of the server
  FormAttributeType = "FormAttributeType", // all input components for the servertype
  Attribute = "Attribute",
  Collection = "Collection",
  FormLayout = "FormLayout",
  FormLayoutItem = "FormLayoutItem",
  TableLayout = "TableLayout",
  CardLayout = "CardLayout",
  // Auth
  User = "User",
  Role = "Role",
  Permission = "Permission",
}

export enum EdgeLabels {
  ServerToFormAttributeType = "ServerToFormAttributeType",
  CollectionHasAttribute = "CollectionHasAttribute",
  FormLayoutItemHasCollection = "FormLayoutItemHasCollection",
  FormLayoutItemHasAttribute = "FormLayoutItemHasAttribute",
  FormLayoutHasItem = "FormLayoutHasItem",
}

// ********
