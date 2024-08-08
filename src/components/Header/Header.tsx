import React, { useEffect, useRef, useState } from 'react';
import { createTodo, USER_ID } from '../../api/todos';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  setTempTodo: (todo: Todo | null) => void;
  setErrorMessage: (errorMessage: string) => void;
  onTogleAllCompleted: (activeButton: boolean) => void;
};

export const Header: React.FC<Props> = ({
  todos,
  setTempTodo,
  setErrorMessage,
  onTogleAllCompleted,
}) => {
  const [query, setQuery] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const textField = useRef<HTMLInputElement>(null);
  const [activeToggleButton, setActiveToggleButton] = useState(false);

  useEffect(() => {
    textField.current?.focus();
  }, [isDisabled]);

  useEffect(() => {
    setActiveToggleButton(todos.every(({ completed }) => completed));
  }, [todos]);

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onCreateTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsDisabled(true);

    if (!query.trim()) {
      setQuery('');
      setErrorMessage('Title should not be empty');
      textField.current?.focus();

      setTimeout(() => {
        setErrorMessage('');
        setIsDisabled(false);
      }, 3000);

      return;
    }

    setTempTodo({
      id: 0,
      title: query.trim(),
      userId: USER_ID,
      completed: false,
    });

    createTodo({
      completed: false,
      title: query.trim(),
      userId: USER_ID,
    })
      .then(() => {
        setQuery('');
      })
      .catch(() => {
        setTempTodo(null);
        setErrorMessage('Unable to add a todo');
        setTimeout(() => setErrorMessage(''), 3000);
      })
      .finally(() => {
        setIsDisabled(false);
      });
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: activeToggleButton,
        })}
        data-cy="ToggleAllButton"
        onClick={() => onTogleAllCompleted(!activeToggleButton)}
      />

      {/* Add a todo on form submit */}
      <form onSubmit={onCreateTodo}>
        <input
          ref={textField}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={handleChangeQuery}
          disabled={isDisabled}
        />
      </form>
    </header>
  );
};
