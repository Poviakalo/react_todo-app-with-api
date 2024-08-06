/* eslint-disable react/display-name */
import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  setTodos: (callback: (todos: Todo[]) => Todo[]) => void;
  tempTodo: Todo | null;
  onDelete: (id: number) => void;
  setErrorMessage: (message: string) => void;
  activeTodoButton: boolean;
};

export const ListTodo: React.FC<Props> = React.memo(
  ({
    todos,
    setTodos,
    tempTodo,
    onDelete,
    setErrorMessage,
    activeTodoButton,
  }) => {
    return (
      <section className="todoapp__main" data-cy="TodoList">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            setErrorMessage={setErrorMessage}
            activeTodoButton={activeTodoButton}
            setTodos={setTodos}
          />
        ))}

        {tempTodo && (
          <TodoItem
            key={tempTodo.id}
            todo={tempTodo}
            onDelete={onDelete}
            setErrorMessage={setErrorMessage}
            activeTodoButton={activeTodoButton}
            setTodos={setTodos}
          />
        )}
      </section>
    );
  },
);
