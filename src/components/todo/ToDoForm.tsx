import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import { useToDo } from '../../context/ToDoContext';
import { Task } from '../../context/ToDoContextTypes';

const ToDoForm = () => {
  const [newTaskValue, setNewTaskValue] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const { dispatch } = useToDo();

  const handleAddTask = () => {
    if (newTaskValue.length > 0) {
      const taskId = uuid();
      const newTask: Task = {
        id: taskId,
        description: newTaskValue,
      };

      dispatch({ type: 'new-task', payload: { task: newTask } });
      setNewTaskValue('');
      setValidationMessage('');
    } else {
      setValidationMessage('Enter the Task description');
    }
  };

  return (
    <div className='todo-form'>
      <input
        type='text'
        name='new-task'
        value={newTaskValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTaskValue(e.target.value)}
      />
      <button onClick={handleAddTask}>Add new TO-DO</button>
      {validationMessage.length > 1 && <div>{validationMessage}</div>}
    </div>
  );
};

export default ToDoForm;
