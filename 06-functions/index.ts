// return value covariance
const cb = () => 1;
function fn(cb: () => number) {}
fn(cb);

const cb2 = (): string => "a";
function fn2(cb: () => "a") {}
// @ts-expect-error
fn2(cb2);

// params contrcovariance
const cb3 = (arg: number) => {};
function fn3(cb: (arg: 1) => void) {}
fn3(cb3);

const cb4 = (arg: 1) => {};
function fn4(cb: (arg: number) => void) {}
// @ts-expect-error
fn4(cb4);
