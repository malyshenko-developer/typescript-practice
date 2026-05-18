// Type assignable to itself
const str: string = "stroka";
const str2: string = str;

// Literals assignable to a general type
const oneNum: 1 = 1;
const num: number = oneNum;

const trueBool: true = true;
const bool: boolean = trueBool;

const obj = {
  value: "1",
};
const allObjects: object = obj;
