import React from 'react';

import { useToDo } from '../../context/ToDoContext';

import { Collums, Task } from '../../context/ToDoContextTypes';

import { ToDoBlockProps } from './ToDoTypes';

const ToDoBlock: React.FC<ToDoBlockProps> = ({
  title,
  tasks,
  blockCollum,
  enableDelete,
  moveFoward,
  moveBackward,
}) => {
  const { dispatch, state } = useToDo();

  const handleMovingTask = (task: Task, direction: { from: Collums; to: Collums }) =>
    dispatch({
      type: 'move-task',
      payload: { id: task.id, from: direction.from, to: direction.to },
    });

  const handleDeleteTask = (task: Task, from: Collums) =>
    dispatch({ type: 'delete-task', payload: { id: task.id, from: from } });

  const handleDragStart = (task: Task) =>
    dispatch({ type: 'set-selected-task', payload: { origin: blockCollum, task: task } });

  const handleOnDrop = () => {
    const { selectedTask } = state;
    if (selectedTask && selectedTask?.origin !== blockCollum) {
      dispatch({
        type: 'move-task',
        payload: { id: selectedTask.task.id, from: selectedTask.origin, to: blockCollum },
      });
    }
  };

  const handleOnDragEnter = (e: React.DragEvent<HTMLElement>) => e.preventDefault();

  const handleOnDragOver = (e: React.DragEvent<HTMLElement>) => e.preventDefault();

  return (
    <section
      className='todo-block-item'
      onDragEnter={handleOnDragEnter}
      onDragOver={handleOnDragOver}
      onDrop={(_e) => handleOnDrop()}
    >
      <h2>{title}</h2>
      <hr />
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li draggable onDragStart={(_e) => handleDragStart(task)} key={task.id}>
              {moveBackward && (
                <img
                  src='/assets/images/left_icon.svg'
                  alt='back'
                  title='move back'
                  onClick={() => handleMovingTask(task, moveBackward)}
                />
              )}
              <p>{task.description}</p>
              {moveFoward && (
                <img
                  src='/assets/images/right_icon.svg'
                  alt='foward'
                  title='move foward'
                  onClick={() => handleMovingTask(task, moveFoward)}
                />
              )}
              {enableDelete && (
                <img
                  src='/assets/images/bin_remove_icon.svg'
                  alt='delete'
                  title='delete'
                  onClick={() => handleDeleteTask(task, enableDelete.from)}
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className='no-task'>No tasks</div>
      )}
    </section>
  );
};

export default ToDoBlock;
