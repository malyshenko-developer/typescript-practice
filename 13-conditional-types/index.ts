export {};
type IsString<T> = T extends string ? true : false;

type ResultTrue = IsString<"blabla">;
type ResultFalse = IsString<2>;
// With never it doesn't work
type ResultNever = IsString<never>; // never
// With any it's strange
type ResultStrange = IsString<any>; // boolean

type IsNumber<T> = T extends number ? true : false;
type IsAssignable<T, V> = T extends V ? true : false;

// With the help of types we can make real dirt
function value<T>(arg: T): T extends string ? number : string {
  return {} as any;
}

const r1 = value("str");
const r2 = value(1);

// We can also use conditions to restrict the type

// Bypassing the index type limitation
type GetValue<T, K> = K extends keyof T ? T[K] : never;
type R1 = GetValue<{ name: string }, "name">;

// Bypassing ... limitation
type Push<T, K> = T extends unknown[] ? [...T, K] : K;

// Bypassing the extends other generic types
type MyParams<T> = T extends (...args: never[]) => unknown
  ? Parameters<T>
  : never;

// With the help of conditional types we can make boolean algebra in types
type Or<T1, T2> = T1 extends true ? true : T2 extends true ? true : false;
type And<T1, T2> = T1 extends true ? (T2 extends true ? true : false) : false;

type Or3<T1, T2, T3> = Or<T1, Or<T2, T3>>;
type And3<T1, T2, T3> = And<T1, And<T2, T3>>;

type Not<T1> = T1 extends true ? false : true;

type CheckKeyStringNotId<T> = And<
  IsString<T>,
  Not<
    Or3<IsAssignable<T, "id">, IsAssignable<T, "slug">, IsAssignable<T, "uuid">>
  >
>;

type R = CheckKeyStringNotId<number>;
type R2 = CheckKeyStringNotId<"some-string">;
type R3 = CheckKeyStringNotId<"id">;
type R4 = CheckKeyStringNotId<"slug">;
type R5 = CheckKeyStringNotId<"uuid">;

// This can be useful to avoid making ternaries nested to infinity.
type WrapNotIdString<T> =
  And<
    IsString<T>,
    Not<
      Or3<
        IsAssignable<T, "id">,
        IsAssignable<T, "slug">,
        IsAssignable<T, "uuid">
      >
    >
  > extends true
    ? { notIdString: T }
    : T;

type R6 = WrapNotIdString<"str">;

// Practice
type ExtractValueFromKey2<T> = "key" extends keyof T
  ? T["key"] extends keyof T
    ? T[T["key"]]
    : unknown
  : unknown;

type Result1 = ExtractValueFromKey2<{ key: "value"; value: number }>; // number
type Result2 = ExtractValueFromKey2<{
  key: "value" | "name";
  value: number;
  name: string;
}>; // number | string

type Result3 = ExtractValueFromKey2<{ key: "value" }>; // unknown
type Result4 = ExtractValueFromKey2<{}>; // unknown
