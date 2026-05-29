export {};
// We can create not only specific string literals
// But also string patterns
type Greeting = `Hello, ${string}`;

const greeting: Greeting = "Hello, World!"; // valid
const greeting2: Greeting = "Hello, World!!!"; // valid

// Useful for restricting strings to certain patterns
function absoluteUrl(str: `${"http" | "https"}://${string}`) {}

absoluteUrl("https://hello-world");
absoluteUrl("http://hello-world");
// @ts-expect-error
absoluteUrl("wss://hello-world");

// We can pass not only string to the template, but also union literals
type EventType = "click" | "hover" | "scroll";
type EventHandlerName = `on-${EventType}`;

const onClick: EventHandlerName = "on-click";
const onHover: EventHandlerName = "on-hover";

// If there are several unions, the result will be a union of all the options
type Action = "create" | "update" | "delete";
type Resourse = "user" | "post" | "comment";
type ApiEndpoint = `api/${Action}/${Resourse}`;

const createUserEndpoint: ApiEndpoint = "api/create/user";
const updatePostEndpoint: ApiEndpoint = "api/update/post";

// TypeScript also provides several built-in helpers
type U = Uppercase<`Hello world`>;
type C = Capitalize<`hello world`>;
type L = Lowercase<`Hello world`>;
type UC = Uncapitalize<`Hello World`>;

// In combination with them, you can make convenient transformations
type EventType2 = "click" | "hover" | "scroll";
type EventHandlerName2 = `on${Capitalize<EventType2>}`;

const onClick2: EventHandlerName2 = "onClick";
const onHover2: EventHandlerName2 = "onHover";

// Practice
type Getter<T extends string> = `on${Capitalize<T>}`;

type R = Getter<"create">; // "onCreate"
