export type Collums = 'todo' | 'doing' | 'done';

export type Task = {
  id: string;
  description: string;
};

export type Action =
  | { type: 'new-task'; payload: { task: Task } }
  | { type: 'delete-task'; payload: { id: string; from: Collums } }
  | { type: 'move-task'; payload: { id: string; from: Collums; to: Collums } };

export type Dispatch = (action: Action) => void;

export type State = { todo: Task[]; doing: Task[]; done: Task[] };

export type ToDoProviderProps = { children: React.ReactNode };
