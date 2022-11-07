import React from 'react';

import { ToDoProvider, useToDo } from '../../context/ToDoContext';

import ToDoForm from './ToDoForm';
import ToDoBlock from './ToDoBlock';

import './styles/ToDo.css';

const ToDoComponent = () => {
  const { state } = useToDo();

  return (
    <article>
      <h1>My Tasks</h1>
      <ToDoForm />
      <div className='todo-block-container'>
        <ToDoBlock
          title='TO-DO'
          tasks={state.todo}
          enableDelete={{ from: 'todo' }}
          moveFoward={{ from: 'todo', to: 'doing' }}
        />
        <ToDoBlock
          title='DOING'
          tasks={state.doing}
          enableDelete={{ from: 'doing' }}
          moveFoward={{ from: 'doing', to: 'done' }}
          moveBackward={{ from: 'doing', to: 'todo' }}
        />
        <ToDoBlock title='DONE' tasks={state.done} enableDelete={{ from: 'done' }} />
      </div>
    </article>
  );
};

const ToDoContainer = () => (
  <ToDoProvider>
    <ToDoComponent />
  </ToDoProvider>
);

export default ToDoContainer;
