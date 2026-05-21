// TASK! Write a type that can assign ANY array (don't forget the as const)
// Without using any
// Come up with test cases
function getAnyArray(param: readonly unknown[]) {}

const arg1 = [1, 2, 3, "4", "5", "6"];
getAnyArray(arg1);

const arg2 = [{ "1": 1, "2": "2" }, true, 3, "Nikita"];
getAnyArray(arg2);

const arg3 = [] as const;
getAnyArray(arg3);

// TASK! Write a type that can assign any array with length more then 1
// Without any
function getNotEmptyArray(param: readonly [unknown, unknown, ...unknown[]]) {}

// @ts-expect-error
getNotEmptyArray([]);
// @ts-expect-error
getNotEmptyArray([1]);

getNotEmptyArray([1, 2]);
const arg = [1, 2, 3] as const;
getNotEmptyArray(arg);

// TASK! Type the function so it can accept safer values.
// Without using any
// Are generics needed here?
function structureTypeFn1(value: {
  arr: readonly [unknown, { obj: { name: string } }, ...unknown[]];
}): string {
  return value.arr[1].obj.name;
}

const structureType1 = {
  arr: [
    1,
    {
      obj: {
        name: "asd",
        value: "",
      },
    },
    {
      hello: 1,
    },
  ],
  value: 1,
} as const;

structureTypeFn1(structureType1);

// TASK! Update the type of the previous function to allow adding non-existent parameters.
// when creating an object during a call
// index signature
function structureTypeFn2(value: {
  arr: readonly [
    unknown,
    { obj: { name: string; [key: string]: unknown } },
    ...unknown[],
  ];
  [key: string]: unknown;
}): string {
  return value.arr[1].obj.name;
}

structureTypeFn2({
  arr: [
    1,
    {
      obj: {
        name: "asd",
        value: "",
      },
    },
    {
      hello: 1,
    },
  ],
  value: 1,
});

// TASK! When intersected with what type will the result always be the original type?
type TestIntersection<T> = T & unknown;
type ResTestIntersection = TestIntersection<string>;

// TASK! When intersected with what type will never always occur?
type TestIntersection2<T> = T & never;
type ResTestIntersection2 = TestIntersection2<string>;

// TASK! When union with what type, will it always result in the same type?
type TestUnion<T> = T | never;
type ResTestUnion = TestUnion<string>;

// TASK! When union with what type will it always result in unknown?
type TestUnion2<T> = T | unknown;
type ResTestUnion2 = TestUnion2<string>;

// TASK! How to use intersection to filter all numbers
type FilterIntersection<T> = T & string;
type ResFilterIntersection = FilterIntersection<1 | 2 | "value" | "b">;

// TASK! How to use intersection to retrieve an event by type from a union
type FindEventByIntersection<T, K> = T & { type: K };

type Event1 = { type: "user-created"; data: { name: string } };
type Event2 = { type: "user-deleted"; data: { id: number } };

type ResFindEventByIntersection = FindEventByIntersection<
  Event1 | Event2,
  "user-deleted"
>;

// TASK! Write a type such that the function can be called in 3 different ways.
type Params =
  | [{ isOne: true }, number]
  | [{ isTwo: true }, number, number]
  | [{ isThree: true }, number, number, number];
function structureUnion(...params: Params) {}

structureUnion({ isOne: true }, 1);
// @ts-expect-error There is an error here because isOne only has one additional argument.
structureUnion({ isOne: true }, 1, 2);
structureUnion({ isTwo: true }, 1, 2);
structureUnion({ isThree: true }, 1, 2, 3);

// TASK! Without using any, write a function type to which any callback can be assigned.
function anyCallback(cb: (...args: never[]) => unknown) {}

anyCallback((a: number) => 1);
anyCallback((a: string, b: number) => "str");

// TASK! What type should be passed to a Ref parameter so that any other ref can be assigned to that type?
type Ref<T> = { current: T } | ((value: T) => void);

type SuperRef = Ref<any>;

function storeRef(anyRef: SuperRef) {}

const numberRef = {} as Ref<number>;
const stringRef = {} as Ref<string>;

storeRef(numberRef);
storeRef(stringRef);
