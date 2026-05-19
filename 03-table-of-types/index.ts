// Example 1
type A = Function;
type B = object;

type Test1<T extends B> = T;
type Res1 = Test1<A>;

// Example 2 All types assignable to unknown
type Test2<C extends unknown> = C;
type Res2 = Test2<[]>;

// Example 3 never assignable to all types
type Test3<C extends number> = C;
type Res3 = Test3<never>;

// Example 4 any - father type =)
type Test4<C extends any> = C;
type Res4 = Test4<"stroka">;

type Test5<C extends string> = C;
type Res5 = Test5<any>;

// Example 5 readonly, Object, object, void and undefined
function objFn(obj: object) {}

objFn(() => {});
objFn([]);

function ObjFn(Obj: Object) {}

ObjFn(1);
ObjFn("");

const arr: number[] = [];
function readonlyArrFn(arr: readonly number[]) {}
readonlyArrFn(arr);

const voidVal: void = undefined;
