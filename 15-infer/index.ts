export {};
type GetLastTupleElent<T> = T extends [...unknown[], infer Last] ? Last : never;
type Res = GetLastTupleElent<[number, string]>;

// What is it used for?
// For getting information about functions
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type RT = MyReturnType<() => string>; // string

// To extract values ​​from complex types
type UnwrapPromise<T> = T extends Promise<infer U> ? U : never;
type PromisedString = Promise<string>;
type Unwrapped = UnwrapPromise<PromisedString>; // string

// For working with tuples
type FirstElement<T extends any[]> = T extends [infer U, ...any[]] ? U : never;
type MyTuple = [string, number, boolean];
type First = FirstElement<MyTuple>; // string

// For working with string literals
type FirstLetter<T extends string> = T extends `${infer L}${string}`
  ? L
  : never;

type FirstLetterRes = FirstLetter<"assa">;

// Practice
type MyParameters<T> = T extends (...args: infer Param) => void ? Param : never;
type GreetReturnType = MyParameters<(name: string, value: number) => void>; // [string, number]

type Shift<T> = T extends [First: unknown, ...infer Other] ? Other : never;
type Result = Shift<[3, 2, 1]>; // [2, 1]

type Pop<T> = T extends [...infer Other, Last: unknown] ? Other : never;
type Result2 = Pop<[3, 2, 1]>; // [3, 2]
