export {};
// mapped types and optionality
type Obj = {
  a: number;
  b?: number;
};

type JumpMap<T> = {
  [K in keyof T]: T[K];
};

// 1. mapped types saving optionality
type R1 = JumpMap<Obj>;

// 2. Optionality is determined on the basis of keyof the
type Mp<T, V> = {
  [K in keyof T]: V[K & keyof V];
};

type R2 = Mp<{ name?: string }, { name: number }>;

// 3. Optionality and union with undefined
// to up after processing the value
type Mp2<T> = {
  [K in keyof T]: Exclude<T[K], undefined>;
};

type R3 = Mp2<{ name?: string }>;

// 4. Merging objects while preserving optionality
type Simplify<T> = {
  [K in keyof T]: T[K];
} & {};

type R41 = Simplify<{ name: string } & { name?: string }>;
type R42 = Simplify<{ name?: string } & { name?: string }>;
type R43 = Simplify<{ name: string } & { name: number }>;

type Mp3<T, V> = {
  [K in keyof (T & V)]: K extends keyof V ? V[K] : T[K & keyof T];
};

type R44 = Mp3<{ name?: string }, { name?: number }>;
type R45 = Mp3<{ name?: string }, { name: number }>;

// 5. Saving optionality doesn't working if we give union of keys
// union with undefined obtained due to the access to the optional field
type Mp4<T, V> = {
  [K in keyof T | keyof V]: K extends keyof V ? V[K] : T[K & keyof T];
};

type R51 = Mp4<{ name?: string }, { value?: number }>;

// 6. We can use it without -?
// What's the problem -? It removes | undefined if it isn't necessary
type Mp51<T> = {
  [K in keyof T]-?: T[K] | undefined;
};

type R61 = Mp51<{ name?: string | undefined; value: string | undefined }>;

// Let's try using a hack from the past
// It doesn't work because ts collapses the union.
type Mp52<T> = {
  [K in keyof T | keyof {}]: T[K & keyof T];
};

type R62 = Mp52<{ name?: string }>;

// So it works
type Mp53<T, O = {}> = {
  [K in keyof T | keyof O]: T[K & keyof T];
};

type R63 = Mp53<{ name?: string; value: string | undefined }>;
