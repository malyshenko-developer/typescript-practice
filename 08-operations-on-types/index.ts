export {};

type Id = string | number;

type Ref<T> = { current: T };

// With extends we can constrain a type parameter
type GetEventByType<T extends { type: string }, K extends string> = T & {
  type: K;
};

type Events = { type: "create"; data: 1 } | { type: "delete"; data: 2 };

type R = GetEventByType<Events, "create">;

// We can use previos params for constrain next params
type GetEventByType2<T extends { type: string }, K extends T["type"]> = T & {
  type: K;
};

type R2 = GetEventByType2<Events, "create">;

// We can specify default values for params
type EventType<K = string, D = unknown> = {
  type: K;
  data: D;
};

type GetEventByType3<T extends EventType, K extends T["type"]> = T & {
  type: K;
};

type R3 = GetEventByType3<
  EventType<"create", 1> | EventType<"delete", 2>,
  "create"
>;
