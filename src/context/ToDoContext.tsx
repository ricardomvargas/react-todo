import React from 'react';

import { Task, Collums, Action, Dispatch, State, ToDoProviderProps } from './ToDoContextTypes';

const ToDoStateContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(
  undefined
);

const removeTaskFromList = (from: Collums, id: string, state: State) => {
  const newState = state;

  switch (from) {
    case 'todo':
      newState.todo = state.todo.filter((task) => task.id !== id);
      break;
    case 'doing':
      newState.doing = state.doing.filter((task) => task.id !== id);
      break;
    case 'done':
      newState.done = state.done.filter((task) => task.id !== id);
      break;
  }

  return newState;
};

const getListWithoutTask = (from: Collums, id: string, state: State) => {
  switch (from) {
    case 'todo':
      return state.todo.filter((task) => task.id !== id);
    case 'doing':
      return state.doing.filter((task) => task.id !== id);
    case 'done':
      return state.done.filter((task) => task.id !== id);
  }
};

const getTaskFromList = (from: Collums, id: string, state: State) => {
  switch (from) {
    case 'todo':
      return state.todo.find((task) => task.id === id);
    case 'doing':
      return state.doing.find((task) => task.id === id);
    case 'done':
      return state.done.find((task) => task.id === id);
  }
};

const toDoReducer = (state: State, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case 'new-task': {
      const newTodoList = state.todo;
      newTodoList.push(payload.task);
      return { ...state, todo: newTodoList };
    }
    case 'delete-task': {
      const newState = removeTaskFromList(action.payload.from, action.payload.id, state);
      return { ...newState };
    }
    case 'move-task': {
      const task = getTaskFromList(action.payload.from, action.payload.id, state);
      const newTaskList = getListWithoutTask(action.payload.from, action.payload.id, state);
      const newState = state;

      switch (action.payload.to) {
        case 'todo':
          newState.todo.push(task as Task);
          break;
        case 'doing':
          newState.doing.push(task as Task);
          break;
        case 'done':
          newState.done.push(task as Task);
          break;
      }

      switch (action.payload.from) {
        case 'todo':
          newState.todo = newTaskList;
          break;
        case 'doing':
          newState.doing = newTaskList;
          break;
        case 'done':
          newState.done = newTaskList;
          break;
      }

      return { ...newState };
    }
  }
};

const ToDoProvider = ({ children }: ToDoProviderProps) => {
  const [state, dispatch] = React.useReducer(toDoReducer, { todo: [], doing: [], done: [] });
  const value = { state, dispatch };
  return <ToDoStateContext.Provider value={value}>{children}</ToDoStateContext.Provider>;
};

const useToDo = () => {
  const context = React.useContext(ToDoStateContext);
  if (context === undefined) {
    throw new Error('useToDo must be used within a ToDoProvider');
  }
  return context;
};

export { ToDoProvider, useToDo };
