type User = {
  id: number;
  name: string;
};

type Article = {
  id: number;
  title: string;
  author: string;
};

const users: User[] = [
  { id: 1, name: "Nikita Malyshenko" },
  { id: 2, name: "Jensen Ackels" },
  { id: 3, name: "Jared Padalecki" },
];

const articles: Article[] = [
  {
    id: 1,
    title: "TypeScript Utility Types: Полное руководство",
    author: "Sarah Drasner",
  },
  {
    id: 2,
    title: "Асинхронность в JavaScript: от колбэков до Async/Await",
    author: "Dan Abramov",
  },
  {
    id: 3,
    title: "Паттерны проектирования в TypeScript",
    author: "Matt Pocock",
  },
];

function sortUsers(users: User[]) {
  return [...users].sort((a, b) => a.name.localeCompare(b.name));
}

function sortArticles(articles: Article[]) {
  return [...articles].sort((a, b) => a.title.localeCompare(b.title));
}

function sortArticlesByAuthor(articles: Article[]) {
  return [...articles].sort((a, b) => a.author.localeCompare(b.author));
}

type OnlyStringObjectKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

function sortByStringKey<T extends Record<string, any>>(
  objs: T[],
  key: OnlyStringObjectKeys<T>,
) {
  return [...objs].sort((a, b) => a[key].localeCompare(b[key]));
}

const sortedArticles = sortByStringKey<Article>(articles, "author");
const sortedArticles2 = sortByStringKey<Article>(articles, "title");
const sortedUsers = sortByStringKey<User>(users, "name");
