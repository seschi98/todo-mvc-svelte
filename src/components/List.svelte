<script>
  import { todos, onlyCheckedTodos, onlyUncheckedTodos } from '../store/todos';
  import ListFooter from './ListFooter.svelte';
  import ListItem from './ListItem.svelte';

  export let filter = 'all';
  export let location;

  $: editingId = -1;
  $: currentFilteredTodos = todos;

  $: {
    if (filter === 'all') {
      currentFilteredTodos = todos;
    } else if (filter === 'completed') {
      currentFilteredTodos = onlyCheckedTodos;
    } else if (filter === 'active') {
      currentFilteredTodos = onlyUncheckedTodos;
    }
  }

  const onToggleAllButtonClick = (e) => {
    todos.toggleAll(e.target.checked);
  };

  const enableEditMode = (id) => () => {
    editingId = id;
  };

  const onEditInputBlur = (id) => () => {
    if (editingId === id) {
      editingId = -1;
    }
  };
</script>

{#if $todos.length > 0}
  <section class="main">
    <input
      id="toggle-all"
      class="toggle-all"
      type="checkbox"
      on:click={onToggleAllButtonClick} />
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      {#each $currentFilteredTodos as todoItem}
        <ListItem
          {todoItem}
          editing={editingId === todoItem.id}
          on:blur={onEditInputBlur(todoItem.id)}
          on:edit={enableEditMode(todoItem.id)} />
      {/each}
    </ul>
  </section>
  <ListFooter />
{/if}
