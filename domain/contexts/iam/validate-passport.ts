import { hasPermission, isField } from "./validate-passport-rules";

export const not = (func: boolean): boolean => {
  return !func;
}
 
export const or = (...functions: boolean[]): boolean => {
  return functions.some(func => func);
}

export const and = (...functions: boolean[]): boolean => {
  return functions.every(func => func);
}

export const validate = (func: boolean) => {
  if (!func) {
    throw new Error('You do not have permission to update this record');
  }
}

export { hasPermission, isField };