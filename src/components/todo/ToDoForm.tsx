import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import { useToDo } from '../../context/ToDoContext';
import { Task } from '../../context/ToDoContextTypes';

const ToDoForm = () => {
  const [newTaskValue, setNewTaskValue] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const { dispatch } = useToDo();

  useEffect(() => {
    if (newTaskValue.length >= 250) {
      setValidationMessage('Task must have Max 250 characters');
    } else {
      setValidationMessage('');
    }
  }, [newTaskValue]);

  /**
   * #TODO: Improve error validation and input validation
   */
  const handleAddTask = () => {
    if (newTaskValue.length > 0 && newTaskValue.length < 250) {
      const taskId = uuid();
      const newTask: Task = {
        id: taskId,
        description: newTaskValue,
      };

      dispatch({ type: 'new-task', payload: { task: newTask } });
      setNewTaskValue('');
      setValidationMessage('');
    } else if (newTaskValue.length >= 250) {
      setValidationMessage('Task must have Max 250 characters');
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
      <button onClick={handleAddTask}>ADD TASK</button>
      <div>{validationMessage}</div>
    </div>
  );
};

export default ToDoForm;
