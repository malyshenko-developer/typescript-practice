export {};
// mapped types for creating object
type KeysUnion = "id" | "name" | "value";

// Create an object with all the keys in the union
type Obj = {
  [K in KeysUnion]: number;
};

// When creating an object, the value of K after ":" will be equal to the value of the key
type ObjKeys = {
  [K in KeysUnion]: K;
};

// We can create objects dynamically
type Obj2 = {
  [K in KeysUnion]: K extends "id" ? string : number;
};

// Although an object can be created from any union of strings,
// Most often, this mechanism is used with the key of another object.
type User = {
  id: number;
  name: string;
  value: string;
};

type UserMethods = {
  [K in keyof User]: () => User[K];
};

// Sometimes you need to rename keys, then you can use the as operator
type Getter<T extends string> = `get${Capitalize<T>}`;
type UserMethods2 = {
  [K in keyof User as Getter<K>]: () => User[K];
};

// If you need to rename before and after : to do rename before in
type UserMethods3 = {
  [K in Getter<keyof User>]: K;
};

// Instead of a specific object there may be a generic
type ObjectGetters<T> = {
  [K in keyof T as Getter<K & string>]: () => T[K];
};
type UserMethods4 = ObjectGetters<User>;

// You can use the as operator to filter out certain keys.
// To do this, you need to return never for this key.
type RemoveKey<T, R> = {
  [K in keyof T as K extends R ? never : K]: T[K];
};
type UserWithoutId = RemoveKey<User, "id">;

// We can mofificate not only object but and arrays, tuples
type ParseStringTuple<T extends unknown[]> = {
  [K in keyof T]: T[K] extends `${infer V extends number}` ? V : never;
};
type Tuple = ParseStringTuple<["1", "2", "3"]>;

// Also we cab add and remove readonly and optionaly
type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};

type NotReadonlyUser = {
  -readonly [K in keyof ReadonlyUser]: ReadonlyUser[K];
};

type OptionalUser = {
  [K in keyof User]?: User[K];
};

type RequiredUser = {
  [K in keyof OptionalUser]-?: OptionalUser;
};

// Practice
// Task 1
type ExcludeNull<T> = T extends null ? never : T;
type NotNull<T> = {
  [K in keyof T]: ExcludeNull<T[K]>;
};
type Res = NotNull<{ value: string | null; arg: string }>; // { value: string, arg: string }

// Task 2
type RemoveByValue<T, V> = {
  [K in keyof T as T[K] extends V ? never : K]: T[K];
};
type Res1 = RemoveByValue<{ value: string | null; arg: number }, number>; // { value: string | null }

// Task 3
type SafeMerge<T, T1> = {
  [K in keyof T | keyof T1]: K extends keyof T1
    ? T1[K]
    : K extends keyof T
      ? T[K]
      : never;
};
// If common fields exist to give last
type Res2 = SafeMerge<
  { value: string; common: string },
  { value2: number; common: number }
>; // { value: string, value2: number, common: number }
