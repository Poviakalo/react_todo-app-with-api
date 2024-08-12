/* eslint-disable react/display-name */
import React from 'react';
import { LoadingItem, Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  setTodos: (callback: (todos: Todo[]) => Todo[]) => void;
  tempTodo: Todo | null;
  onDelete: (id: number) => void;
  setErrorMessage: (message: string) => void;
  isLoadingItems: LoadingItem[];
};

export const ListTodo: React.FC<Props> = React.memo(
  ({
    todos,
    setTodos,
    tempTodo,
    onDelete,
    setErrorMessage,
    isLoadingItems,
  }) => {
    return (
      <section className="todoapp__main" data-cy="TodoList">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            setErrorMessage={setErrorMessage}
            setTodos={setTodos}
            isLoadingItems={isLoadingItems}
          />
        ))}

        {tempTodo && (
          <TodoItem
            key={tempTodo.id}
            todo={tempTodo}
            onDelete={onDelete}
            setErrorMessage={setErrorMessage}
            setTodos={setTodos}
            isLoadingItems={isLoadingItems}
          />
        )}
      </section>
    );
  },
);
