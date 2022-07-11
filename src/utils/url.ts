// https://stackoverflow.com/questions/8648892/how-to-convert-url-parameters-to-a-javascript-object
export function getQueryParams() {
  const paramObj: { [key: string]: string } = {};
  const querystring = window.location.search;
  const searchParams = new URLSearchParams(querystring);
  //* ** :loop to add key and values to the param object.
  searchParams.forEach(function (value, key) {
    paramObj[key] = value;
  });
  return paramObj;
}

export function isSubDomain() {
  return window.location.hostname.split('.').length > 2;
}
export function getSubDomain() {
  const match = window.location.hostname.match(/(\w+).chat./);
  return match ? match[1] : null;
}
export function getSubDomainRegex(regexp: string) {
  const match = window.location.hostname.match(new RegExp(regexp));
  return match ? match[1] : null;
}
