export {};
type Union = "id" | "value";

type WrapId<T> = T extends "id" ? { id: T } : T;

// It should just be "id" | "value"
// And in fact, we were supposed to go into the false branch, but it was not to be!
type R = WrapId<Union>; // But the resulting type is "value" | { id: "id" }

// We can filter the union using never
type OnlyObjectsWithType<T> = T extends { type: string } ? T : never;

type Res = OnlyObjectsWithType<
  number | { type: "delete" } | { type: "create" }
>;

// We can intentionally trigger this process to get union
type WrapInArray1<T> = T[];
type R1 = WrapInArray1<number | string>; // (string | number)[]

type WrapInArray2<T> = T extends unknown ? T[] : never;
type R2 = WrapInArray2<number | string>; // string[] | number[]

// We can off it
type WrapId1<T> = [T] extends ["id"] ? { id: T } : T;
type R3 = WrapId1<"id" | "value" | "res">;
type Value = WrapId1<never>;
type Value2 = WrapId1<any>;

// Practice
// Task 1
type MyExclude<T, E> = T extends E ? never : T;

type Result = MyExclude<"a" | "b" | "c", "a">; // "b" | "c"

// Task2
type Defined<T> = T extends undefined | null ? never : T;

type Result2 = Defined<number | undefined | null>; // number
