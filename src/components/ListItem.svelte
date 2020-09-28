<script>
  import { createEventDispatcher } from 'svelte';

  import { todos } from '../store/todos';

  export let todoItem;
  export let editing = false;

  const dispatch = createEventDispatcher();

  const onDoubleClick = () => {
    dispatch('edit');
    const input = document.querySelector(`[data-edit-todo="${todoItem.id}"]`);
    setTimeout(() => input.focus(), 50);
  };

  const onDeleteButtonClick = () => {
    todos.removeTodo(todoItem.id);
  };

  const onEditInputChange = (e) => {
    todos.updateTodoText(todoItem.id, e.target.value);
  };

  const onCheckboxClick = () => {
    todos.toggleTodo(todoItem.id);
  };
</script>

<li class:completed={todoItem.done} class:editing>
  <div class="view">
    <input
      class="toggle"
      type="checkbox"
      checked={todoItem.done}
      on:click={onCheckboxClick} />
    <label on:dblclick={onDoubleClick}>{todoItem.text}</label>
    <button class="destroy" on:click={onDeleteButtonClick} />
  </div>
  <input
    class="edit"
    data-edit-todo={todoItem.id}
    value={todoItem.text}
    on:blur
    on:change={onEditInputChange} />
</li>
