export {};

// object
type Obj = {
  name: string;
};

const value: "value" = "value";
const obj2 = {
  name: value,
  someAnotherField: "1234",
};

const obj: Obj = obj2;

// tuple
type Tuple = [Obj, number];

const one: 1 = 1;
const tuple: Tuple = [obj2, one];

// dictionary
type Dict = {
  [id: string]: Obj;
};

const dict: Dict = {
  ["1"]: obj2,
  ["2"]: obj2,
};

// array
const arrStr = [{ name: "str", value: "str" }];
const arr: Obj[] = arrStr;
