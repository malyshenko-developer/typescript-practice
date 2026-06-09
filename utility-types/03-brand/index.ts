type Brand<T, K extends string> = T & { __brand: K };

type UserId = Brand<string, "userId">;

function createUserId(): UserId {
  return crypto.randomUUID() as UserId;
}
function findUserById(userId: UserId) {}

const id = createUserId();

findUserById(id);

// @ts-expect-error
findUserById("wrong-id");
