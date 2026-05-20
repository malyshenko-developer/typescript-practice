export {};

// union
type Events =
  | { type: "user-created"; data: { name: string } }
  | { type: "user-deleted"; data: { id: number } };

const e1 = { type: "user-created" as const, data: { name: "Nikita" } };
const e2 = e1 as Events;

// type assignable to union
function fn1(events: Events) {}

fn1(e1);
fn1({
  type: "user-deleted",
  data: {
    id: 1,
  },
});

// union assingnable to type
function fn2(value: { type: string }) {}
fn2(e2);

// more examples
function fn3(union: "a" | "b") {}

fn3("a");
fn3("b");

const value = "a" as "a" | "b";

function fn4(value: "b") {}

// union isn't assignable to type
// @ts-expect-error
fn4(value);

// intersection
type T1 = { name: string };
type T2 = { value: number };

type Intersection = T1 & T2;
const intersection: Intersection = { name: "1", value: 2 };

// type assignable to intersection
function fn5(arg: Intersection) {}
fn5({
  name: "1",
  value: 1,
});

// intersection assignable to type
function fn6(v: T1) {}
function fn7(v: T2) {}

fn6(intersection);
fn7(intersection);

// what will be if intersection doens't exist?
type Value = number & string;
// will be never
const v: Value = 1 as never;

// what will be if field with incompatible types?
type Obj = { value: number } & { value: string };

const v2: Obj = {
  // will be never
  value: 1 as never,
};

// more examples
type T3 = "a" | "b";
type T4 = "b" | "c";

const value1: T3 & T4 = "b";

function fn8(value: T3) {}
function fn9(value: T4) {}

fn8(value1);
fn9(value1);

// not assignable
function fn10(intersection: T3 & T4) {}

const t1 = "a" as T3;
const t2 = "b" as T4;
// @ts-expect-error
fn10(t1);
// @ts-expect-error
fn10(t2);
