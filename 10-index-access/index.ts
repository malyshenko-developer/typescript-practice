export {};
// Getting the object field type by key
type Obj = {
  id: number;
  title: string;
  name: {
    value: string;
  };
};

type NameObject = Obj["name"];
type Value = Obj["name"]["value"];
type TitleOrId = Obj["title" | "id"];

type KeysUnion = "title" | "id";
type TitleOrId2 = Obj[KeysUnion];

// Getting the union of all values ​​of an object
type Values = Obj[keyof Obj];

// Getting the value type of a dict
type Dict = {
  [value: string]: number;
};

type DictValue = Dict[string];

// Getting the value type of a tuple
type Tuple = [number, string, { value: string }];

type First = Tuple[0];
type TupleValue = Tuple[2]["value"];
type FirstOrSecond = Tuple[0 | 1];

// Getting union of all values of a tuple
type TupleValues = Tuple[number];

// Getting length of a tuple
type TupleLength = Tuple["length"];

// Getting the value type of array
type Arr = Array<number | string>;
type ArrayValue = Arr[number];

// We can't get an unexisting key
// @ts-expect-error
type E = Obj["another"];
// but there is an exception
type Never = Obj[never];

// Often encountered when working with generic types
// @ts-expect-error
type GetObjectValue<T, K> = T[K];

// Solutions
// Restrict type K to keys T
type GetObjectValue2<T, K extends keyof T> = T[K];
type Res2 = GetObjectValue2<Obj, "id">;

// Intersect type K with keys T
type GetObjectValue3<T, K> = T[K & keyof T];
type Res3 = GetObjectValue3<Obj, "name">;

// In this case, a non-existent key will return never
type Res4 = GetObjectValue3<Obj, "another">;

// practice
// example 1
type GetIdType<T extends { id: unknown }> = T["id"];

type R1 = GetIdType<{ id: string; name: string }>; // string
type R2 = GetIdType<{ id: number }>; // number

// @ts-expect-error
type R3 = GetIdType<{}>;

// example 2
type ExtractValueFromKey<T extends { key: string }> = T[T["key"] & keyof T];

type R4 = ExtractValueFromKey<{ key: "value"; value: number }>;
type R5 = ExtractValueFromKey<{
  key: "value" | "name";
  value: number;
  name: string;
}>; // number | string

type R6 = ExtractValueFromKey<{ key: "value" }>; // never

// @ts-expect-error
type R7 = ExtractValueFromKey<{}>;
