export {};
// We can use TypeScript types to create recursive structures
type Tree<G> = {
  value: G;
  children: Tree<G>[];
};

const tree: Tree<number> = {
  value: 1,
  children: [{ value: 2, children: [] }],
};

// We can use it to recursive generics
type MyAwaited<T> = T extends Promise<infer V> ? MyAwaited<V> : T;

type Res1 = MyAwaited<Promise<Promise<Promise<number>>>>;

// And for recursive traversal of nested objects
type DeepReadonly<T> = {
  readonly [K in keyof T]: DeepReadonly<T[K]>;
};

type Res2 = DeepReadonly<{ value: { title: string } }>;

// But we can it to create specific such cycles
type Reverse<Tuple extends unknown[]> = Tuple extends [
  infer First,
  ...infer Tail,
]
  ? [...Reverse<Tail>, First]
  : [];

type Ten = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
type Res4 = Reverse<Ten>;

// The default recursion depth is 50]
// @ts-expect-error
type Res5 = Reverse<[...Ten, ...Ten, ...Ten, ...Ten, ...Ten, 1]>;

// The tail recursion limit is 1000
type CreateTuple<
  Num extends number,
  Tuple extends unknown[] = [],
> = Tuple["length"] extends Num ? Tuple : CreateTuple<Num, [...Tuple, unknown]>;

type Res3 = CreateTuple<999>;

// Practice
// Task 1
type DeepRequired<T> = {
  [K in keyof T]-?: DeepRequired<T[K]>;
};

type Res6 = DeepRequired<{
  value?: {
    title?: string;
  };
}>; // { value: { title: string } }

// Task 2
type Flatten<T> = T extends [infer First, ...infer Tail]
  ? First extends unknown[]
    ? [...Flatten<First>, ...Flatten<Tail>]
    : [First, ...Flatten<Tail>]
  : [];

type Res7 = Flatten<[1, 2, [1, 2, [3]]]>; // [1, 2, 1, 2, 3]

// Task 3
// Rewrite Reverse on tail recursion
type Reverse2<
  Tuple extends unknown[],
  TupleNew extends unknown[] = [],
> = Tuple extends [infer First, ...infer Tail]
  ? Reverse2<Tail, [First, ...TupleNew]>
  : TupleNew;
// recursion more than 50
type Res8 = Reverse2<[...Ten, ...Ten, ...Ten, ...Ten, ...Ten, 1]>;

// Task 4
type SafeMergeTuple<
  Tuple extends object[],
  Acc extends object = {},
> = Tuple extends [infer First, ...infer Tail extends object[]]
  ? SafeMergeTuple<
      Tail,
      {
        [K in keyof Acc | keyof First]: K extends keyof First
          ? First[K]
          : K extends keyof Acc
            ? Acc[K]
            : never;
      }
    >
  : Acc;

type Res9 = SafeMergeTuple<
  [
    { value: string },
    { name: string },
    { age: number; name: number },
    { age: boolean },
  ]
>; // { value: string, name: number, age: number }
