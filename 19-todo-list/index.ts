export {};
type TodoList = [
  {
    id: 1;
    text: "Learn TypeScript";
    completed: false;
  },
  {
    id: 2;
    text: "To do something usefull";
    completed: true;
  },
];

type AddItem<TodoList extends object[], Id, Text> = [
  ...TodoList,
  {
    id: Id;
    text: Text;
    completed: false;
  },
];
type Res1 = AddItem<TodoList, 3, "New task">;

type RemoveItem<TodoList, Id> = TodoList extends [
  infer FirstTask,
  ...infer TailTasks,
]
  ? FirstTask extends { id: Id }
    ? TailTasks
    : [FirstTask, ...RemoveItem<TailTasks, Id>]
  : [];
type Res2 = RemoveItem<Res1, 3>;

type UpdateText<TodoList, Id, Text> = TodoList extends [
  infer FirstTask,
  ...infer TailTasks,
]
  ? FirstTask extends { id: Id; completed: infer Completed }
    ? [{ id: Id; text: Text; completed: Completed }, ...TailTasks]
    : [FirstTask, ...UpdateText<TailTasks, Id, Text>]
  : [];
type Res3 = UpdateText<Res2, 2, "Learning TypeScript">;

type ToggleCompleted<TodoList, Id> = TodoList extends [
  infer FirstTask,
  ...infer TailTasks,
]
  ? FirstTask extends { id: Id; completed: infer Completed; text: infer Text }
    ? [
        {
          id: Id;
          text: Text;
          completed: Completed extends true ? false : true;
        },
        ...TailTasks,
      ]
    : [FirstTask, ...ToggleCompleted<TailTasks, Id>]
  : [];
type Res4 = ToggleCompleted<Res3, 1>;

type FindById<TodoList, Id> = TodoList extends [
  infer FirstTask,
  ...infer TailTasks,
]
  ? FirstTask extends { id: Id }
    ? FirstTask
    : FindById<TailTasks, Id>
  : never;
type Res5 = FindById<Res4, 2>;

type FilterByPattern<TodoList, Pattern> = TodoList extends [
  infer FirstTask,
  ...infer TailTasks,
]
  ? FirstTask extends Pattern
    ? [FirstTask, ...FilterByPattern<TailTasks, Pattern>]
    : [...FilterByPattern<TailTasks, Pattern>]
  : [];
type Res6 = FilterByPattern<Res4, { completed: true }>;
type Res7 = FilterByPattern<Res4, { id: 1 }>;
