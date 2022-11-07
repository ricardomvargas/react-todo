import React from 'react';

import { useToDo } from '../../context/ToDoContext';

import { Collums, Task } from '../../context/ToDoContextTypes';

import { ToDoBlockProps } from './ToDoTypes';

const ToDoBlock: React.FC<ToDoBlockProps> = ({
  title,
  tasks,
  enableDelete,
  moveFoward,
  moveBackward,
}) => {
  const { dispatch } = useToDo();

  const handleMovingTask = (task: Task, direction: { from: Collums; to: Collums }) =>
    dispatch({
      type: 'move-task',
      payload: { id: task.id, from: direction.from, to: direction.to },
    });

  const handleDeleteTask = (task: Task, from: Collums) =>
    dispatch({ type: 'delete-task', payload: { id: task.id, from: from } });

  return (
    <section className='todo-block-item'>
      <h2>{title}</h2>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {moveBackward && (
                <button onClick={() => handleMovingTask(task, moveBackward)}>back</button>
              )}
              {task.description}
              {moveFoward && (
                <button onClick={() => handleMovingTask(task, moveFoward)}>foward</button>
              )}
              {enableDelete && (
                <button onClick={() => handleDeleteTask(task, enableDelete.from)}>del</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div>No tasks</div>
      )}
    </section>
  );
};

export default ToDoBlock;
