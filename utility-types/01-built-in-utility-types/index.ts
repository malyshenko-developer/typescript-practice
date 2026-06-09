export {};
class ThenableUser {
  then(cb: (user: { name: string }) => void) {}
}

type Aw = Awaited<ThenableUser>;

type C2 = Partial<{ name: string; value: string; value2: string }>;
type C3 = Required<{ name?: string; value?: string; value3: string }>;

type R = Exclude<
  { type: "create"; data: number } | { type: "delete" },
  { type: "create" }
>;

type R2 = Extract<
  { type: "create"; data: number } | { type: "delete" },
  { type: "create" }
>;

type A = Record<string, unknown>;
type A1 = Record<"value" | "name", number> & Record<"value2", string>;
type A2 = Pick<
  { name: string; value: string; value2: string },
  "value" | "value2"
>;
type A3 = Omit<{ name: string; value: string; value3: string }, "name">;

type OptionalKeys<T, K extends keyof T> = Simplify<
  Omit<T, K> & Partial<Pick<T, K>>
>;

type User1 = { name: string; value: string };
type CreateUser = OptionalKeys<User1, "value">;

export type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {};
