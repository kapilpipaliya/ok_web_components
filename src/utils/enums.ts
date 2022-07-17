import { createSignal } from "solid-js";
import { SetStoreFunction, Store } from "solid-js/store";
import { G, D } from "@mobily/ts-belt";
export const IS_PRODUCTION = process.env.NODE_ENV == "production";
export const [getIsProduction, setIsProduction] = createSignal(IS_PRODUCTION);

export enum SortDirection {
  None,
  Ascending,
  Descending,
}

// table:
export enum DisplayType {
  UNINITIALIZED,
  Checkbox = 1,
  Number,
  Text,
  Double,
  Date,
  DateTime,
  Url,
  Color,
}

export enum FieldType {
  button = 1,
  checkbox,
  checkboxes,
  color,
  date,
  datetime_local,
  email,
  file,
  image,
  month,
  number,
  password,
  radio,
  range,
  reset,
  search,
  submit,
  tel,
  text,
  time,
  url,
  week,
  textarea,
  select,
  jsonEditor,
  internal_true_edge,
  multi_select,
  multi_select_hidden,
  text_array,
  multi_select_bool_properties,
  flatPicker,
  WYSIWYG,
  serial,
  codemirror,
  save_time,
  inserted,
  updated,
  dropzone,
  dateRange,
  emoji,
  mindMap,
  mapCountries,
  uuid,
  fieldSet,
  tab,
  subdomain,
  chatInput,
}

export enum ET {
  get = 1,
  subscribe,
  unsubscribe,
  insert,
  update,
  replace,
  delete_,
  batchUpdate,
  batchDelete,
  changePosition,
}

export const form_schema_evt = (id: string | number) => [
  ET[ET.get],
  "form_schema_get",
  id,
];
// generate event from schema:
export const schemaEvents = (schema: string) => {
  if (schema === "register") {
    return [null, "register_user"];
  }
  if (schema === "mregister") {
    return [null, "register_member"];
  }
  if (schema === "login") {
    return [null, "login"];
  }
  if (schema === "mlogin") {
    return [null, "member_login"];
  }
  if (schema === "member_setting") {
    return [null, "setting_mutate"];
  }
  if (schema === "work_package_setting") {
    return [null, "setting_mutate"];
  }
  if (schema === "custom_fields") {
    return [null, "setting_mutate"];
  }
  if (schema === "system_setting") {
    return [null, "setting_mutate"];
  }
  if (schema === "email_setting") {
    return [null, "setting_mutate"];
  }
  if (schema === "auth_setting") {
    return [null, "setting_mutate"];
  }
  return [`${schema}_list`, `${schema}_mutate`];
};
export enum NotificationType {
  default_,
  info,
  success,
  warning,
  danger,
}
export type FormValue = {
  [id: string]: string | number | string[];
};
export type FormFields = {
  [id: string]: {
    label: string;
    type: FieldType;
    isRequired: boolean;
    isDisabled: boolean;
    description: string;
    props: { dp?: string };
  };
};

export type FormOptions = {};
export type NewFormSchema = {
  fields: FormFields;
  formProps: FormOptions;
};
// export type IS_VISIBLE = { [id: string]: boolean };
export type SORT_DIRECTION = { [id: string]: SortDirection };
export type GroupByARRAY = {
  showDropArea: true;
  showToggleButton: false;
  showGroupedColumn: false;
  showUngroupButton: true;
  columns: [];
};
// export type IS_EDITABLE = { [id: string]: {} };
export type WIDTH = { [id: string]: number };
export type IdsARRAY = string[];
// export type ColumnPROPSARRAY = { [id: string]: { dp?: string } };
export type AllIdsLabelsObject = { [id: string]: string };

export type TableOptionButtonLabels = {
  save?: string;
  cancel?: string;
};
export type TABLE_OPTIONS = {
  showKeyRev?: boolean;
  add?: { l: TableOptionButtonLabels; pos: string; type: string };
  table?: { header: boolean; row: string };
  tree?: boolean;
  drag?: boolean;
};
export type TableSchemaObject = {
  type: DisplayType;
  visible: boolean;
  editable: boolean;
  props: {};
  width: number;
};
export type TableSchema = {
  columnSchema: { [id: string]: TableSchemaObject };
  sort: SORT_DIRECTION;
  width: WIDTH;
  selectedColumns: IdsARRAY;
  allColumns: AllIdsLabelsObject;
  tableProps: TABLE_OPTIONS;
};

export interface SingeResult {
  [key: string]: string | number | boolean;
}

export type TableResult = Array<SingeResult>;
export type TablePagination = [number, number, number];
export type TableResultAll = FailOrSuccessResult & {
  n: { result: TableResult };
  d: { result: string[] };
  m: { result: TableResult };
  r: { fullCount: number; pagination: TablePagination; result: TableResult };
};
export type TableResultWithSchema = TableSchema & TableResultAll;
export type FormResultWithSchema = NewFormSchema & TableResultAll;

export type FailOrSuccessResult = { error: boolean; description?: string };

export enum Pagination {
  limit,
  offset,
  currentPage,
}

export enum WsStatus {
  RECONNECTION = "Reconnecting...",
}
export enum GeneralError {
  NO_ERROR = "",
  ERROR_HEADER = "ERROR!",
  INVALID_SCHEMA = "invalid schema",
  NO_EVENTS = "No events for the schema",
  WAIT = "Please wait ...",
}
export enum TableError {
  INVALID_VALUE = "invalid values",
}
export enum FormError {
  INVALID_VALUE = "invalid values",
}
export enum ConfirmError {
  ConfirmingHeader = "Confirming",
  ConfirmedHeader = "Confirmed",
  Verification = "Email Verification",
  CheckInbox = "Please check your inbox to verify email.",
  EmailConfirmed = "Email Successfully confirmed",
}
export enum LogoutError {
  LogoutHeader = "Logged out successfully!",
  LogoutMessage = "Thank you for visiting. See you again soon.",
}

export enum OrganizationLayoutError {
  NO_ORG_FOUND = "no organization found",
  NO_ORG_ID = "Please Select Organization",
  EMPTY_ORG_ID = "org key must not be empty when processing menu",
}
export enum ProjectLayoutError {
  NO_PROJECT_FOUND = "no project found",
  NO_PROJECT_ID = "Please Select Project",
  EMPTY_PROJECT_ID = "project key must not be empty when processing menu",
}
export enum DropPosition {
  none = 0,
  top,
  center,
  bottom,
}
export const makeTableArgs = () => {
  return {
    setFilter(f: {}) {
      this.f = f;
      return this;
    },
    setPagination(p: number[]) {
      this.p = p;
      return this;
    },
    setSort(s: {}) {
      this.s = s;
      return this;
    },
    setAll(isAll: boolean) {
      this.all = isAll;
      return this;
    },
    setHeader(header: boolean) {
      this.h = header;
      return this;
    },
  };
};
export const makeTableOneDeleteArgs = () => {
  return {
    DEL: true,
    setFilter(f: {}) {
      this.f = f;
      return this;
    },
    setKeyRev(key: string, rev: string) {
      this.f = { _key: key, _rev: "" }; // pass _rev later
      return this;
    },
    setUnsub(e: number[]) {
      this.unSub = e;
      return this;
    },
  };
};
export const makeTableManyDeleteArgs = () => {
  return {
    DEL: true,
    setFilter(f: {}) {
      this.f = f;
      return this;
    },
    setUnsub(e: number[]) {
      this.unSub = e;
      return this;
    },
  };
};
export const makeTableDropArgs = () => {
  return {
    setValue(value: []) {
      this.value = value;
      return this;
    },
  };
};
export const ObjectMemberIsString = (args: {}, member: string) => {
  return (
    G.isObject(args) && args.hasOwnProperty(member) && G.isString(args[member])
  );
};
export const ObjectMemberIsBool = (args: {}, member: string) => {
  return (
    G.isObject(args) && args.hasOwnProperty(member) && G.isBoolean(args[member])
  );
};
export const ObjectMemberIsArray = (args: {}, member: string) => {
  return (
    G.isObject(args) &&
    args.hasOwnProperty(member) &&
    Array.isArray(args[member])
  );
};
export const ObjectMemberIsObject = (args: {}, member: string) => {
  return (
    G.isObject(args) && args.hasOwnProperty(member) && G.isObject(args[member])
  );
};
export const ObjectMemberIsInteger = (args: {}, member: string) => {
  return (
    G.isObject(args) && args.hasOwnProperty(member) && G.isNumber(args[member])
  );
};
export const ArrayPosIsString = (args: [], pos: number) => {
  return Array.isArray(args) && args.length > pos && G.isString(args[pos]);
};
export const ArrayPosIsArray = (args: [], pos: number) => {
  return Array.isArray(args) && args.length > pos && Array.isArray(args[pos]);
};
export const ArrayPosIsInteger = (args: [], pos: number) => {
  return Array.isArray(args) && args.length > pos && G.isNumber(args[pos]);
};
export const ArrayPosIsObject = (args: [], pos: number) => {
  return Array.isArray(args) && args.length > pos && G.isObject(args[pos]);
};
export const ArrayPosArrayIndexIsString = (
  args: [],
  pos: number,
  pos2: number
) => {
  return (
    Array.isArray(args) &&
    args.length > pos &&
    ArrayPosIsString(args[pos], pos2)
  );
};
export const ArrayPosObjectMemberIsBool = (
  args: [],
  pos: number,
  member: string
) => {
  return (
    Array.isArray(args) &&
    args.length > pos &&
    ObjectMemberIsBool(args[pos], member)
  );
};
export const ArrayPosObjectMemberIsInteger = (
  args: [],
  pos: number,
  member: string
) => {
  return (
    Array.isArray(args) &&
    args.length > pos &&
    ObjectMemberIsInteger(args[pos], member)
  );
};
export const ArrayPosObjectMemberIsString = (
  args: [],
  pos: number,
  member: string
) => {
  return (
    Array.isArray(args) &&
    args.length > pos &&
    ObjectMemberIsString(args[pos], member)
  );
};
export const ArrayPosObjectMemberIsArray = (
  args: [],
  pos: number,
  member: string
) => {
  return (
    Array.isArray(args) &&
    args.length > pos &&
    ObjectMemberIsArray(args[pos], member)
  );
};

export const isEmptyArray = (json: []) => {
  return Array.isArray(json) && json.length === 0;
};
export const isEmptyObject = (json: {}) => {
  return G.isObject(json) && D.isEmpty(json);
};
export const isNonEmptyObject = (json: {}) => {
  return G.isObject(json) && D.isNotEmpty(json);
};
export const isFunction = (obj: any): obj is Function =>
  typeof obj === "function";
export const isObject = (obj: any): obj is Object =>
  obj !== null && typeof obj === "object";
// export const isInteger = (obj: any): boolean => String(Math.floor(Number(obj))) === obj;
// export const isString = (obj: any): obj is string => Object.prototype.toString.call(obj) === '[object String]';
// eslint-disable-next-line no-self-compare
// export const isNaN = (obj: any): boolean => obj !== obj;
/** @private Does a JSX component have exactly 0 children? */
export const isEmptyChildren = (children: any): boolean => !!children; // I assume if its not children then its no elements
export const isPromise = (value: any): value is PromiseLike<any> =>
  isObject(value) && isFunction(value.then);
/*
const Result = daggy.taggedSum('Result', {
  Success: ['items'],
  Failure: ['description'],
}); */
/* function handleResult(result) {
  result.cata({
    Success: message => console.log(message),
    Failure: error => console.error(error)
  })
} */

export const isEr = (
  d: FailOrSuccessResult,
  state: Store<{ er: string }>,
  setState: SetStoreFunction<{ er: string }>
) => {
  if (!G.isObject(d)) {
    setState({ er: "Invalid result shape, result must be object" });
    return true;
  }
  if (isEmptyObject(d)) {
    setState({ er: "Empty object. (fix backend to return valid object)" });
    return true;
  }
  if (d.error) {
    setState({ er: d.description });
    return true;
  }
  return false;
};