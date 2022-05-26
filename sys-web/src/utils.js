export function hasFormError(formik, field) {
  if (!!formik.errors[field] && formik.touched[field]) {
    return formik.errors[field];
  }

  return null;
}

export function flatArrayToObject(arr, key, value) {
  return arr.reduce((acc, e) => ({ ...acc, [e[key]]: e[value] }), {});
}

export function flatObjectToOptions(obj) {
  return Object.keys(obj).reduce((acc, k) => [...acc, { label: obj[k], value: k }], []);
}

export function uniq(arrArg) {
  return arrArg.filter((elem, pos, arr) => arr.indexOf(elem) === pos);
}

export function strip(str, len = 0) {
  if (("" + str).length > len) {
    let sub = str.substr(0, Math.max(+len, 0));
    return sub.substr(0, sub.lastIndexOf(" ")) + "...";
  }

  return str;
}

export function srid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return `${s4()}-${s4()}-${s4()}`;
}

export function generateUUID() {
  let d = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);

    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

export function findLabelByValue(items, value, placeholder = null) {
  for (let j = 0, jl = items.length; j < jl; j++) {
    if (items[j].value === value) {
      return items[j].label;
    }
  }

  return placeholder;
}

export function isEmpty(a) {
  return a === null || a === "";
}

export function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
