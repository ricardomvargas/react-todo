import { Collums, Task } from '../../context/ToDoContextTypes';

export interface ToDoBlockProps {
  title: string;
  tasks: Task[];
  enableDelete?: { from: Collums };
  moveFoward?: { from: Collums; to: Collums };
  moveBackward?: { from: Collums; to: Collums };
}

export interface ToDoItemProps {
  task: Task;
}
