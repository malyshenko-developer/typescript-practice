export {};

// keyof allows you to get the union of the object's keys
type Obj = {
  id: number;
  title: string;
  name: {
    value: string;
  };
};

type ObjKeys = keyof Obj;

function fn(key: keyof Obj) {}
fn("id");

// keyof with empty object is never
type Never = keyof {};

// keyof Dict is equal to that specified in the index signature
type Dict = { [key: string]: number };
function fnD(key: keyof Dict) {}
fnD("");

// Fun Fact: Creating an Empty Object via Record
type EmptyObject = Record<never, unknown>;

// keyof is safe with any type, but produces gibberish
type Tuple = [1, 2, 3];
function fn2(key: keyof Tuple) {}
fn2("concat");

type Arr = number[];
function fn3(key: keyof Arr) {}
fn3("copyWithin");

type Str = number;
function fn4(key: keyof Str) {}
fn4("toExponential");

type Fn = () => void;
function fn5(key: keyof Fn) {}
fn5("" as never);

// practice
type GetStrictKeys<T> = keyof T & string;

type R1 = GetStrictKeys<{ 0: number; name: string; value: number }>; // "name" | "value"
