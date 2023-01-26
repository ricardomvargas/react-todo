export type Collums = 'todo' | 'doing' | 'done';

export type Task = {
  id: string;
  description: string;
};

export type SelectedTask = { origin: Collums; task: Task };

export type Action =
  | { type: 'new-task'; payload: Task }
  | { type: 'delete-task'; payload: { id: string; from: Collums } }
  | { type: 'move-task'; payload: { id: string; from: Collums; to: Collums } }
  | { type: 'set-selected-task'; payload: SelectedTask };

export type Dispatch = (action: Action) => void;

export type State = {
  todo: Task[];
  doing: Task[];
  done: Task[];
  selectedTask: SelectedTask | undefined;
};

export type ToDoProviderProps = { children: React.ReactNode };
