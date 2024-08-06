/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { changeCompletedTodo, deleteTodo } from '../../api/todos';

type Props = {
  todo: Todo;
  setTodos: (callback: (todos: Todo[]) => Todo[]) => void;
  onDelete: (id: number) => void;
  setErrorMessage: (message: string) => void;
  activeTodo: boolean;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  setTodos,
  onDelete,
  setErrorMessage,
  activeTodo,
}) => {
  const [checked, setChecked] = useState(false);
  const [itemEnterDone, setItemEnterDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { title, completed, id } = todo;

  const handleDelete = (idTodo: number) => {
    setIsLoading(true);
    deleteTodo(id)
      .then(() => onDelete(idTodo))
      .catch(() => {
        setErrorMessage('Unable to delete a todo');
        setTimeout(() => setIsLoading(false), 300);
      })
      .finally(() => {
        setTimeout(() => setErrorMessage(''), 3000);
      });
  };

  useEffect(() => {
    setChecked(completed);
    setItemEnterDone(true);
  }, [completed]);

  const handleOnChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);

    changeCompletedTodo(id, {
      ...todo,
      completed: event.target.checked,
    })
      .then(() => {
        setChecked(!event.target.checked);
        setItemEnterDone(false);
        setTodos(prevTodos => {
          return prevTodos.map(todoItem => {
            if (todoItem.id === id) {
              return { ...todoItem, completed: !event.target.checked };
            }

            return todoItem;
          });
        });
      })
      .catch(() => {
        setErrorMessage('Unable to update a todo');
        setTimeout(() => setErrorMessage(''), 3000);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: checked,
        'item-enter-done': itemEnterDone,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={checked}
          onChange={handleOnChecked}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>

      {/* Remove button appears only on hover */}
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => handleDelete(id)}
      >
        ×
      </button>

      {/* overlay will cover the todo while it is being deleted or updated */}
      <div
        data-cy="TodoLoader"
        className={classNames('modal', 'overlay', {
          'is-active': isLoading || (activeTodo && !checked),
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
