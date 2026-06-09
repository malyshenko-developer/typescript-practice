type Cast<A, B> = A extends B ? A : B;

type Push<A, V> = [...Cast<A, unknown[]>, V];

type R = Push<[1, 2], "value">;
type R2 = Push<string, "value">;
