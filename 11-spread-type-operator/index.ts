export {};
// We can use ... on an array type to create a tuple of any length.
type VariableLengthTuple = [number, ...string[]];
const example1: VariableLengthTuple = [1, "a", "b"];
const example2: VariableLengthTuple = [2, "hi"];

// We can use ... not only at the end
type VariableLengthTuple2 = [number, ...string[], number];
const example3: VariableLengthTuple2 = [1, "a", "b", 2];
const example4: VariableLengthTuple2 = [1, 3];

// ... with array we can use only one time
// @ts-expect-error
type VariableLengthTuple3 = [...string[], ...number[]];

// We can also create and modify tuple types
type Tuple1 = [number, string];
type Tuple2 = [boolean, number];

// There is no limit on one ...
type NestedTuple = [...Tuple1, ...Tuple2];

// The most interesting thing is to use ... with generics
// But there is a problem, ... it can only be used with types assignable to array
// @ts-expect-error
type Push<T, V> = [...T, V];

// Solution - limitation by types
type AnyArray = readonly unknown[];
type Push1<T extends AnyArray, V> = [...T, V];
type R = Push1<[number, string], boolean>;

// There is no limit of two in generics...
type Concat<T extends AnyArray, B extends AnyArray> = [...T, ...B];
type R2 = Concat<number[], string[]>; // (number | string)[]
type R3 = Concat<[number], [string]>; // [number, string]

// Practice
type Unshift<T extends AnyArray, V> = [V, ...T];
type Result = Unshift<[number, string], boolean>; // [boolean, number, string]
