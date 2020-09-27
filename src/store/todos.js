import { derived, writable } from 'svelte/store';
const LOCAL_STORAGE_KEY = 'todos-svelte';

const createTodoStore = () => {
  const { subscribe, set, update } = writable(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? '[]'),
  );

  subscribe((value) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
  });

  const addTodo = (text) => {
    if (!text || text.trim().length === 0) return;
    update((todos) => [{ text, done: false, id: Date.now() }, ...todos]);
  };

  const toggleTodo = (id) => {
    update((todos) =>
      todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  };

  const toggleAll = (value) => {
    update((todos) => todos.map((t) => ({ ...t, done: value })));
  };

  const updateTodoText = (id, text) => {
    update((todos) => todos.map((t) => (t.id === id ? { ...t, text } : t)));
  };

  const removeTodo = (id) => {
    update((todos) => todos.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    update((todos) => todos.filter((t) => !t.done));
  };

  return {
    subscribe,
    addTodo,
    toggleTodo,
    toggleAll,
    updateTodoText,
    clearCompleted,
    removeTodo,
  };
};

export const todos = createTodoStore();
export const onlyCheckedTodos = derived(todos, ($todos) =>
  $todos.filter((t) => t.done),
);
export const onlyUncheckedTodos = derived(todos, ($todos) =>
  $todos.filter((t) => !t.done),
);
